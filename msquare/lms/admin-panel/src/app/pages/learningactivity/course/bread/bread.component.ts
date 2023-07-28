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

  public allModule:any=[];
  courseCode="";
  courseKeywords="";
  courseTitle="";
  expiryDate:any;
  quizAr:any =[];
  courseDesc="";
  keywordsError = "";
  titleError = "";
  thumbnailError="";
  moduleError="";
  thumbnailLink="";
  uploadfilename="";
  descriptionError = "";
  baseURL = environment.baseURL;
  public moduleChecked:any=[];
  public qbChecked:any=[];
  moduleSearched=[];
  qBSearched=[];
  finalModuleData:any=[];
  uploadfile:boolean=false;
  fusionLearningBank:boolean=false;
  edit:boolean=false;
  courseId="";

  label = '';

  loader=false;

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService, public datepipe:DatePipe) {
    }

  ngOnInit(): void {
    this.getModule();
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.label= "Create Course";
        this.titleS.setTitle("Create Course - "+this.appC.title);
        this.getIncrementalCode();
      }else{
        this.edit=true;
        this.label= "Edit Course";
        this.titleS.setTitle("Edit Course - "+this.appC.title);
        this.route.queryParams.subscribe((data:any)=>{
          this.courseId = data.id;
          let couInterval = setInterval(()=>{
            if(this.allModule.length > 0){
              this.getCourseById(data.id);
              clearInterval(couInterval);
            }
              
          },500);
        })
      }
    });
  }

  getIncrementalCode(){
    this.apiS.getIncrementalCodeCourses().subscribe(data=>{
      this.courseCode = data.data.code;

    });
  }


  getCourseById(id:any){
    this.apiS.singleCourse(id).subscribe(courseData=>{
      this.courseCode = courseData.data.code;
      this.courseKeywords = courseData.data.keywords;
      this.courseTitle = courseData.data.title;
      this.courseDesc = courseData.data.description;
      this.thumbnailLink = courseData.data.thumbnail;
      this.quizAr = courseData.data.quiz;
      this.fusionLearningBank = courseData.data.fusionBank;
      this.expiryDate = this.datepipe.transform(courseData.data.expiryDate, 'yyyy-MM-dd','IST');
      for(let i = 0;i<this.allModule.length;i++){
        if(courseData.data.modules.some((code:any) => code.moduleId._id === this.allModule[i]._id)){
          let index = courseData.data.modules.map((img:any)=> { return img.moduleId._id; }).indexOf(this.allModule[i]._id);
          this.allModule[i].index = courseData.data.modules[index].index;
          this.moduleChecked.push(this.allModule[i])
        }
      }
      for(let i = 0;i<courseData.data.modules.length;i++){
        if(this.allModule.some((code:any) => code._id === courseData.data.modules[i].moduleId._id)){
          let index = this.allModule.map((img:any)=> { return img._id; }).indexOf(courseData.data.modules[i].moduleId._id);
          this.allModule.splice(index,1);
        }
      }
      this.moduleChecked.sort((a:any,b:any)=> a.index - b.index);
    });

  }

  getModule(){
    this.apiS.allActiveModulesLearningActivity().subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        data.data[i].index = i;
        this.allModule.push(data.data[i]);
      }
      this.moduleSearched = this.allModule;
    })
  }

  initializeItems(): void {
    this.allModule = this.moduleSearched;
  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (!val) {
      return;
    }
    this.allModule = this.allModule.filter((currentGoal:any) => {
      if (currentGoal.title && val) {
        if (currentGoal.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      return true;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.moduleChecked, event.previousIndex, event.currentIndex);
    this.moduleChecked[event.currentIndex].index = event.currentIndex;
    this.moduleChecked[event.previousIndex].index = event.previousIndex;
  }

  checkModule(i:any){
    this.moduleChecked.push(this.allModule[i]);
    this.allModule.splice(i,1);
  }

  deleteModule(i:any){
    this.allModule.push(this.moduleChecked[i]);
    this.moduleChecked.splice(i,1);
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
    this.finalModuleData=[];
    for(let i=0;i<this.moduleChecked.length;i++){
      this.finalModuleData.push({moduleId:this.moduleChecked[i]._id,index:i})
    }

    console.log(this.finalModuleData);
    if(this.courseCode == "" || this.courseCode == undefined || this.courseCode == null){
      this.toastr.error("Course Code Not Generated");
      this.loader=false;
      return;
    }

    if(this.courseKeywords == ""){
      this.toastr.error("Enter Keywords, Description, Tags");
      this.loader=false;
      return;
    }

    if(this.courseTitle == ""){
      this.toastr.error("Enter Course Title");
      this.loader=false;
      return;
    }

    if(this.courseDesc == ""){
      this.toastr.error("Enter Course Description");
      this.loader=false;
      return;
    }

    if(this.finalModuleData.length == 0){
      this.toastr.error("Choose Atleast 1 Module");
      this.loader=false;
      return;
    }

    if(this.edit){
      const data = JSON.stringify({
        "code": this.courseCode,
        "title": this.courseTitle,
        "keywords": this.courseKeywords,
        "description": this.courseDesc,
        "thumbnail": this.thumbnailLink,
        "modules": this.finalModuleData,
        "fusionBank":this.fusionLearningBank,
        "expiryDate":this.expiryDate,
      });
  
      this.apiS.updateCourse(data,this.courseId).subscribe(data=>{
        if(data.status){
            this.toastr.success(data.message);
            this.clearFilter();
        } else {
          this.toastr.error(data.message);
        }
      })
    }else{
      const data = JSON.stringify({
        "code": this.courseCode,
        "title": this.courseTitle,
        "keywords": this.courseKeywords,
        "description": this.courseDesc,
        "thumbnail": this.thumbnailLink,
        "modules": this.finalModuleData,
        "fusionBank":this.fusionLearningBank,
        "isLearningActivity":true,
        "expiryDate":this.expiryDate,
        "status": 0
      });
      this.apiS.createCourse(data).subscribe(data=>{
  
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
    this.courseCode = "";
    this.courseKeywords = "";
    this.courseTitle = "";
    this.courseDesc = "";
    this.thumbnailLink="";
    this.uploadfilename="";
    this.expiryDate="";
    this.uploadfile=false;
    this.moduleChecked = [];
    this.finalModuleData = [];
    this.getIncrementalCode();
    this.getModule();
    this.router.navigate(['/pages/learning-activity/course']);
  }



}
