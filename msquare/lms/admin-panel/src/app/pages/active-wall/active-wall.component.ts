import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-active-wall',
  templateUrl: './active-wall.component.html',
  styleUrls: ['./active-wall.component.scss']
})
export class ActiveWallComponent {

  message:any="";
  allPosts:any=[];
  department="";
  profilephoto="";
  images:any=[];
  data:any=[];
  isLike:boolean=false;
  baseURL=environment.baseURL;
  birthdays:any=[];
  backButtonSubscription:any;
  public Editor = ClassicEditor;
  config = ClassicEditor.defaultConfig;
  check:any="";
  imageModal:any = "";

  designation:any="";
  greet:any="";
  loading:any = false;
  constructor(public authS:AuthenticationService,public modalService:NgbModal, public apiS:ApiService,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',                                                 // <--- ADDED
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo'
      ]
      },
      placeholder:"What's on your mind, "+this.authS.currentUserValue.firstName,
      height:'100px'
    }
    const myDate = moment().tz('Asia/Kolkata');
    const hrs = myDate.hour();

    if (hrs < 12)
      this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      this.greet = 'Good Evening';
  
    this.apiS.singleUser(this.authS.currentUserValue.id).subscribe(data=>{
      this.designation = data.data.designation;
      this.profilephoto = data.data.profilephoto;
    })
    this._fetchData();
  }

  _fetchData(){
    this.allPosts = [];
    this.apiS.getAllPost().subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        data.data[i].isLike=false;
        data.data[i].isLoading=false;
        if(data.data[i].likes != undefined){
        for(let j=0;j<data.data[i].likes.length;j++){
          data.data[i].isLike=false;
          if(this.authS.currentUserValue.id == data.data[i].likes[j].employeeId){
            data.data[i].isLike =true;
          }else{
            data.data[i].isLike=false;
          }
        }
        }else{
          data.data[i].isLike=false;
        }
      }
      this.allPosts = data.data;
    })
  }

  createPost(){
    this.loading = true;
    
    if(this.message == '' && this.images.length == 0){
        this.toastr.error("Please write or attach something");
        this.loading = false;
        return;
    }


    this.apiS.createPost(this.message,this.authS.currentUserValue.id,this.images).subscribe(data=>{
      if(data.status){
        this.toastr.success(data.message);
        this.message="";
        this.images=[];
        this.check = "";
        this.loading = false;
        this._fetchData();

      }else{
        this.toastr.error(data.message);
        this.loading = false;
      }
    })
  }

  
  openModal(content:any,image:any){
    this.modalService.open(content, {
      centered: true,
      fullscreen:"sm"
    });
    this.imageModal=image;
  }
  
  createPostLikes(id:any,index:any){
    this.allPosts[index].disabled = true;
    this.apiS.createPostLikes(id,this.authS.currentUserValue.id).subscribe(data=>{
      if(data.status == 'success'){
        this.allPosts[index].disabled = false;
          this.allPosts[index].isLike = true;
          this.allPosts[index].likes.push({postId:this.allPosts[index]._id,employeeId:this.authS.currentUserValue.id})
      }
    })
  }

  deletePostLikes(id:any,index:any){
    this.allPosts[index].disabled = true;
    this.apiS.deletePostLikes(id,this.authS.currentUserValue.id).subscribe(data=>{
      if(data.status == 'success'){
        this.allPosts[index].isLike = false;
        for(let i = 0;i<this.allPosts[index].likes.length;i++){
          if(this.allPosts[index].likes[i].employeeId == this.authS.currentUserValue.id){
            this.allPosts[index].likes.splice(i,1);
            this.allPosts[index].disabled = false;
          }
          
        }
      }
    })
  }

  getMyPost(event:any){
    if(event.target.checked){
      this.allPosts=[];
      this.apiS.getAllPendingPost().subscribe(data=>{
        console.log(data);
        for(let i =0;i<data.data.length;i++){
          data.data[i].isLike=false;
          if(data.data[i].likes != undefined){
          for(let j=0;j<data.data[i].likes.length;j++){
            data.data[i].isLike=false;
            if(this.authS.currentUserValue.id == data.data[i].likes[j].employeeId){
              data.data[i].isLike =true;
            }else{
              data.data[i].isLike=false;
            }
          }
          }else{
            data.data[i].isLike=false;
          }
        }
        this.allPosts = data.data;
      })
    }else{
      this._fetchData();
    }
  }

  uploadFile(event:any){
    if (event.target.files) {
      for(let i=0;i<event.target.files.length;i++){
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[i]);
        
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.images.push({path: res.data.url,id:i});
          }
        });
      }
    }
    
  }


  approvePost(id:any){
    this.apiS.updatePost(id).subscribe(data=>{
      if(data.status){
        this.toastr.success(data.message);
        this._fetchData();
        let event = {target:{checked : true}};
        this.getMyPost(event);
      }else{
        this.toastr.error(data.message);
      }
    })
  }

  rejectPost(id:any){
    this.apiS.updateRejectPost(id).subscribe(data=>{
      if(data.status){
        this.toastr.error(data.message);
        this._fetchData();
        let event = {target:{checked : true}};
        this.getMyPost(event);
      }else{
        this.toastr.error(data.message);
      }
    })
  }

  delete(index:any){
    this.images.splice(index, 1);
  }

}

