import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() type: string | undefined;
  
  public DownCollapsed = false;
  public FilterCollapsed = false;

  id:any="";
  index:any="";
  moduleId:any;
  courseId:any;
  courseIndex:any;
  moduleIndex:any;
  
  
  programmes:any=[];
  learningActivities:any = [];
  courses:any=[];
  modules:any=[];
  
  pActiveId :any="";
  pcActiveId :any="";
  cActiveId :any="";
  lpActiveId :any="";
  lpcActiveId :any="";

  constructor(public apiS:ApiService,public authS:AuthenticationService,public route: ActivatedRoute,private dataService:DataService) { }

  ngOnInit(): void {
    localStorage.setItem("refresh","false");
    this.route.params.subscribe((routeParams: any) => {
      this.id = '';
      this.moduleId = '';
      this.courseId= '';
      this.courseIndex= '';
      this.moduleIndex= '';

      this.id = routeParams.id;
      this.index = routeParams.index;
      this.moduleId = routeParams.moduleId;
      this.courseId= routeParams.courseId;
      this.courseIndex= routeParams.courseIndex;
      this.moduleIndex= routeParams.moduleIndex;
      this._fetchData();
    });
    setInterval(()=>{
      if(localStorage.getItem("refresh") == "true"){
        this._fetchData();
      }
    },1000);

  }

  _fetchData(){
    localStorage.setItem("refresh","false");

    this.dataService.getMyProgramsData().subscribe(data=>{
      this.pActiveId = "program-"+this.index;
      this.pcActiveId = "course-"+this.courseIndex;
      this.programmes = data.data;
    });
  

    this.dataService.getMyCoursesData().subscribe(data=>{
      this.cActiveId = "course-"+this.index;
      this.courses = data.data;
    })
    this.dataService.getMyModulesData().subscribe(data=>{
      this.modules = data.data;
    })
    this.dataService.getMyLearningActivityData().subscribe(data=>{
      this.lpActiveId = "program-"+this.index;
      this.lpcActiveId = "course-"+this.courseIndex;
      this.learningActivities = data.data;
    })



  }

}
