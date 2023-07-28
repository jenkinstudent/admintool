import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit{

  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;
  @ViewChild('documentFileChild') documentFileChild!: ElementRef;
  @ViewChild('onePagerChild') onePagerChild!: ElementRef;

  qbData:any = [];
  questions:any = [];
  expiryDate:any;
  moduleCode = "";
  keywords = "";
  moduleTitle = "";
  description = "";
  youtubeLink = "";
  documentFile = "";
  moduleWatchTime=0;
  thumbnailLink = "";
  onePager = "";
  reward=0;
  quizArray:any=[];
  onePagers:any=[];
  isLearningActivity:boolean =false;
  conType = "video";
  qBSearched:any=[];
  qBSearched1:any=[];
  baseURL = environment.baseURL;
  edit:boolean=false;
  fusionLearningBank:boolean = false;
  documentspdf:any=[];
  documents:any=[];
  youtubes:any=[];
  documentLink="";
  moduleId="";

  label = '';

  loader=false;

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService, public datepipe:DatePipe) {
    }

  ngOnInit(): void {
    this.getQuestionBank();
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.label= "Create Module";
        this.titleS.setTitle("Create Module - "+this.appC.title);
        this.getIncrementalCode();
      }else{
        this.edit=true;
        this.label= "Edit Module";
        this.titleS.setTitle("Edit Module - "+this.appC.title);
        this.route.queryParams.subscribe((data:any)=>{
          this.moduleId = data.id;
          let modInterval = setInterval(()=>{
            if(this.qbData.length > 0){
              this.getModuleById(data.id);
              clearInterval(modInterval);
            }
          },500);
        })
      }
    });
  }

  getQuestionBank(){
    this.qbData = [];
    this.apiS.getAllActiveQuestionBank().subscribe(data=>{
      this.qbData = data.data;
      this.qBSearched = this.qbData;
    });
  }

  getModuleById(id:any){
    this.apiS.singleModule(id).subscribe(data=>{
      this.moduleCode = data.data.code;
      this.keywords = data.data.keywords;
      this.moduleTitle = data.data.title;
      this.description = data.data.description;
      this.moduleWatchTime = data.data.moduleWatchTime;
      this.reward = data.data.rewardPoints;
      this.expiryDate = this.datepipe.transform(data.data.expiryDate, 'yyyy-MM-dd','IST');
      this.documentspdf = data.data.documents;
      this.youtubes = data.data.youtubes;
      this.fusionLearningBank = data.data.fusionBank;
      this.thumbnailLink = data.data.thumbnail;
      this.onePagers = data.data.onePagers;
      for(let i = 0;i<this.qbData.length;i++){
        if(data.data.questionbank?._id ==  this.qbData[i]._id){
          this.qbData[i].checked = true;
          this.apiS.getAllQuestion(data.data.questionbank?._id).subscribe(qdata=>{
            if(qdata.data.length > 0){
              this.qbData[i].questions = qdata.data;
            }
          });
        }
      }
    });
  }

  getIncrementalCode(){
    this.apiS.getIncrementalCodeModule().subscribe(data=>{
      this.moduleCode = data.data.code;
    });
  }

  initializeItems(): void {
    this.qbData = this.qBSearched;
  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.qbData = this.qbData.filter((currentGoal:any) => {
      if (currentGoal.title && val) {
        if (currentGoal.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }

  addQuestion(event:any,item:any,index:any){
    
    if(event.target.checked){
      item.checked = true;
      for (var i = 0; i < this.qbData.length; i++) {
        if (i != index) {
            this.qbData[i].checked = false;
            this.qbData[i].questions = [];
        }
      }
      this.apiS.getAllQuestion(item._id).subscribe(data=>{
        if(data.data.length > 0){
          for(let i = 0;i<data.data.length;i++){
          this.qbData[index].questions = data.data;
          }
        }
      });
    } else{
      item.checked = false;
      item.questions = [];
    }
  }

  uploadThumbnail(event:any){
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
        if(img.width == 300 && img.height == 200){
            this.apiS.uploadFile(fileData).subscribe(data=>{
                if(data.status){
                  this.thumbnailLink = data.data.url;
                  this.thumbnailChild.nativeElement.value = "";
                }
              });
            return true;
        }
        this.toastr.error("Please upload file in 300px x 200px");
        this.thumbnailChild.nativeElement.value = "";
        return true;
    }
  }

  uploadDocumentFile(event:any){
    let file = event.target.files;
    let dummy=[];
    for(let i=0;i<file.length;i++){
    
      let fileData:FormData = new FormData();
      fileData.append('file', file[i]);
      this.apiS.uploadFile(fileData).subscribe(data=>{
        if(data.status){
          dummy.push({path:data.data.url,id:i,type:file[i].type});
          this.documentspdf.push({path:data.data.url,id:i,type:file[i].type}); 
          if(dummy.length == file.length){
            this.documentFileChild.nativeElement.value = "";
            dummy = [];
          }
        }
      });
      
    }
  }

  uploadOnePagerFile(event:any){
    let file = event.target.files;
    let dummy=[];
    for(let i=0;i<file.length;i++){
    
      let fileData:FormData = new FormData();
      fileData.append('file', file[i]);
      let img = new Image()
       img.src = window.URL.createObjectURL(event.target.files[0])
       img.onload = () => {
          if(this.calculateAspectRatio(img.width,img.height)){
               
               this.apiS.uploadFile(fileData).subscribe(data=>{
                   if(data.status){
                    dummy.push({path:data.data.url,id:i,type:file[i].type});
                     this.onePagers.push({path:data.data.url,id:i,type:file[i].type});
                     if(dummy.length == file.length){
                      this.onePagerChild.nativeElement.value = "";
                      dummy = [];
                    }
                   }
                 });
            return true;
          }
          if(i == (file.length -1)){
             this.toastr.error("Please upload file in ratio 16:9");
             return true;
          }else{
             return false;
           }
       }
    }
 }

  addYoutubeLink(){
    if(this.youtubeLink != ""){
      this.youtubes.push({path:"https://www.youtube.com/embed/"+this.youtubeLink,id:this.youtubes.length +1,type:'YoutubeLink'});
      this.youtubeLink="";
    }else{
      this.toastr.error("Please enter the link");
    }
  }

  deleteDocument(index:any){
    this.documentspdf.splice(index, 1);
  }

  deleteOnePager(index:any){
    this.onePagers.splice(index, 1);
  }

  deleteYoutubes(index:any){
    this.youtubes.splice(index, 1);
  }

  save(){
    this.loader=true;
    let data = this.qbData.filter((user:any) =>user.checked );
    let link = "";

    if(this.moduleCode == "" || this.moduleCode == undefined || this.moduleCode == null){
      this.toastr.error("Module Code Not Generated");
      this.loader=false;
      return;
    }

    if(this.keywords == ""){
      this.toastr.error("Enter Keywords, Description, Tags");
      this.loader=false;
      return;
    }

    if(this.moduleTitle == ""){
      this.toastr.error("Enter Module Title");
      this.loader=false;
      return;
    }

    if(this.description == ""){
      this.toastr.error("Enter Module Description");
      this.loader=false;
      return;
    }


    if(this.documentspdf.length == 0){
      this.toastr.error("Upload Atleast 1 Document");
      this.loader=false;
      return;
    } 

    if(this.documentspdf.length >= 6){
      this.toastr.error("Upload Only 6 Document");
      this.loader=false;
      return;
    }


    if(data.length == 0){
      this.toastr.error("Choose Atleast 1 Questionbank");
      this.loader=false;
      return;
    }

    if(this.onePagers.length == 0){
      this.toastr.error("Upload Atleast 1 One Pager");
      this.loader=false;
      return;
    }

    if(this.moduleWatchTime == 0 ){
      this.toastr.error("Enter Module Watch Time In Minutes");
      this.loader=false;
      return;
    }

    if(this.edit){
      const mdata = JSON.stringify({
        "code":this.moduleCode,
        "title":this.moduleTitle,
        "keywords":this.keywords,
        "description":this.description,
        "documents":this.documentspdf,
        "youtubes":this.youtubes,
        "thumbnail":this.thumbnailLink,
        "questionbank":data[0]._id,
        "onePagers":this.onePagers,
        "rewardPoints":this.reward,
        "fusionBank":this.fusionLearningBank,
        "isLearningActivity":false,
        "expiryDate":this.expiryDate,
        "moduleWatchTime":this.moduleWatchTime
      });
  
      this.apiS.updateModule(mdata,this.moduleId).subscribe(data=>{
        if(data.status){
            this.toastr.success(data.message);
            this.clearFilter();
        } else {
          this.toastr.error(data.message);
        }
      })
    }else{
      const mdata = JSON.stringify({
        "code":this.moduleCode,
        "title":this.moduleTitle,
        "keywords":this.keywords,
        "description":this.description,
        "documents":this.documentspdf,
        "youtubes":this.youtubes,
        "thumbnail":this.thumbnailLink,
        "onePagers":this.onePagers,
        "questionbank":data[0]._id,
        "rewardPoints":this.reward,
        "status":0,
        "fusionBank":this.fusionLearningBank,
        "isLearningActivity":false,
        "expiryDate":this.expiryDate,
        "moduleWatchTime":this.moduleWatchTime
  
      })
      this.apiS.createModule(mdata).subscribe(data=>{
  
        if(data.status){
            this.toastr.success(data.message);
            this.clearFilter();
        } else {
          this.toastr.error(data.message);
        }
      })
    }
   
  }

  clearFilter(){
    this.moduleCode = "";
    this.keywords = "";
    this.moduleTitle = "";
    this.description = "";
    this.youtubeLink= "";
    this.thumbnailLink = "";
    this.onePagers = [];
    this.reward=0;
    this.youtubes=[]
    this.moduleWatchTime =0;
    this.expiryDate="";
    this.documentspdf=[];
    this.documentFile ="";
    this.quizArray = [];
    this.questions =[];
    this.getIncrementalCode();
    this.getQuestionBank();
    this.router.navigate(['/pages/programs/module']);
  }

  public calculateAspectRatio(width: number, height: number): Boolean {
    const ratio = width / height;
    if (ratio === 1.7777777777777777) { // 16:9 aspect ratio
      return true;
    } 
    return false;
  }



}
