import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
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

  public allCourse:any=[];
  programCode="";
  programKeywords="";
  programTitle="";
  expiryDate:any;
  programDesc="";
  thumbnailLink="";
  uploadfilename="";
  moduleChecked:any=[];
  courseSearched=[];
  finalCourseData:any=[];
  uploadfile:boolean=false;
  baseURL = environment.baseURL;
  edit:boolean=false;
  fusionLearningBank:boolean = false;
  isLearningActivity:boolean = false;
  isCertificate:boolean = false;
  programId="";

  label = '';

  loader=false;

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService, public datepipe:DatePipe) {
    }

  ngOnInit(): void {
    this.getCourse();
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.label= "Create Program";
        this.titleS.setTitle("Create Program - "+this.appC.title);
        this.getIncrementalCode();
      }else{
        this.edit=true;
        this.label= "Edit Program";
        this.titleS.setTitle("Edit Program - "+this.appC.title);
        this.route.queryParams.subscribe((data:any)=>{
          this.programId = data.id;
          let couInterval = setInterval(()=>{
            if(this.allCourse.length > 0){
              this.getProgramById(data.id);
              clearInterval(couInterval);
            }
              
          },500);
          
        })
      }
    });
  }

  getProgramById(id:any){
    this.apiS.singleProgram(id).subscribe(programData=>{
      this.programCode = programData.data.code;
      this.programKeywords = programData.data.keywords;
      this.programTitle = programData.data.title;
      this.programDesc = programData.data.description;
      this.thumbnailLink = programData.data.thumbnail;
      this.fusionLearningBank = programData.data.fusionBank;
      this.isCertificate = programData.data.isCertificate;
      this.expiryDate = this.datepipe.transform(programData.data.expiryDate, 'yyyy-MM-dd','IST');
      for(let i = 0;i<this.allCourse.length;i++){
        for(let cm =0;cm<programData.data.courses.length;cm++){
          if(programData.data.courses[cm].courseId._id ==  this.allCourse[i]._id){
            this.allCourse[i].checked = true;
            this.allCourse[i].index = programData.data.courses[cm].index;
          }
        }
      }
      for(let i = 0;i<this.allCourse.length;i++){
        if(programData.data.courses.some((code:any) => code.courseId._id === this.allCourse[i]._id)){
          let index = programData.data.courses.map((img:any)=> { return img.courseId._id; }).indexOf(this.allCourse[i]._id);
          this.allCourse[i].index = programData.data.courses[index].index;
          this.moduleChecked.push(this.allCourse[i])
        }
      }
      for(let i = 0;i<programData.data.courses.length;i++){
        if(this.allCourse.some((code:any) => code._id === programData.data.courses[i].courseId._id)){
          let index = this.allCourse.map((img:any)=> { return img._id; }).indexOf(programData.data.courses[i].courseId._id);
          this.allCourse.splice(index,1);
        }
      }
      this.moduleChecked.sort((a:any,b:any)=> a.index - b.index);
    });
  }

  getCourse(){    
    this.apiS.allActiveCourseLeaningActivity().subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        data.data[i].index = i;
        this.allCourse.push(data.data[i]);
      }
      this.courseSearched = this.allCourse;
    })
  }

  getIncrementalCode(){
    this.apiS.getIncrementalCodeProgram().subscribe(data=>{
      this.programCode = data.data.code;
    });
  }

  initializeItems(): void {
    this.allCourse = this.courseSearched;
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.allCourse = this.allCourse.filter((currentGoal:any) => {
      if (currentGoal.title && val) {
        if (currentGoal.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }

  checkCourse(i:any){
    this.moduleChecked.push(this.allCourse[i]);
    this.allCourse.splice(i,1);
  }

  deleteCourse(i:any){
    this.allCourse.push(this.moduleChecked[i]);
    this.moduleChecked.splice(i,1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.moduleChecked, event.previousIndex, event.currentIndex);
    this.moduleChecked[event.currentIndex].index = event.currentIndex;
    this.moduleChecked[event.previousIndex].index = event.previousIndex;
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

  save(){
    this.loader=true;
    this.finalCourseData=[];
    for(let i=0;i<this.moduleChecked.length;i++){
      this.finalCourseData.push({courseId:this.moduleChecked[i]._id,index:i})
    }

    if(this.programCode == "" || this.programCode == undefined || this.programCode == null){
      this.toastr.error("Module Code Not Generated");
      this.loader=false;
      return;
    }

    if(this.programKeywords == ""){
      this.toastr.error("Enter Keywords, Description, Tags");
      this.loader=false;
      return;
    }

    if(this.programTitle == ""){
      this.toastr.error("Enter Program Title");
      this.loader=false;
      return;
    }

    if(this.programDesc == ""){
      this.toastr.error("Enter Program Description");
      this.loader=false;
      return;
    }

    if(this.finalCourseData.length == 0){
      this.toastr.error("Choose Atleast 1 Course");
      this.loader=false;
      return;
    }
    
    if(this.edit){
      const data = JSON.stringify({
        "code":this.programCode,
        "title":this.programTitle,
        "keywords":this.programKeywords,
        "description":this.programDesc,
        "courses":this.finalCourseData,
        "thumbnail":this.thumbnailLink,
        "fusionBank":this.fusionLearningBank,
        "isCertificate":this.isCertificate,
        "isLearningActivity":true,
        "expiryDate":this.expiryDate
      })
  
      this.apiS.updateProgram(data,this.programId).subscribe(data=>{
        if(data.status){
            this.toastr.success(data.message);
            this.clearFilter();
        } else {
          this.toastr.error(data.message);
        }
      })
    }else{
      const data = JSON.stringify({
        "code":this.programCode,
        "title":this.programTitle,
        "keywords":this.programKeywords,
        "description":this.programDesc,
        "courses":this.finalCourseData,
        "isCertificate":this.isCertificate,
        "thumbnail":this.thumbnailLink,
        "status":0,
        "fusionBank":this.fusionLearningBank,
        "isLearningActivity":true,
        "expiryDate":this.expiryDate
      })
  
      this.apiS.createProgram(data).subscribe(data=>{
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
    this.programCode = "";
    this.programKeywords = "";
    this.programTitle = "";
    this.programDesc = "";
    this.thumbnailLink="";
    this.fusionLearningBank = false;
    this.uploadfile=false;
    this.uploadfilename="";
    this.isCertificate = false;
    this.expiryDate="";
    this.moduleChecked=[];
    this.finalCourseData = [];
    this.getIncrementalCode();
    this.getCourse();
    this.router.navigate(['/pages/learning-activity/program']);
  }


}
