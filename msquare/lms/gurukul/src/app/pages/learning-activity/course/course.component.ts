import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramCoursePipe } from 'src/app/core/pipes/program-course.pipe';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses:any=[];
  id:any="";
  index:any="";
  counts:any=[];

  baseURL = environment.baseURL;
  constructor(public apiS:ApiService,public authS:AuthenticationService,public route:ActivatedRoute,
    private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    this.route.params.subscribe((data:any)=>{
      this.index = data.index;
      this.dataService.getMyLearningActivityData().subscribe(data=>{
        data.data[this.index].programId?.courses.forEach((element:any) => {
          element.percentage = 100;
        });
        this.courses = data.data[this.index].programId?.courses;
        this.dataService.getMyLearningActivityCoursesDoneData(data.data[this.index].programId?._id).subscribe(res =>{
          this.counts = res.data
        })
      })
    })
  }


}
