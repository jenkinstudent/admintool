import { Component, OnInit } from '@angular/core';
import { CoursePipe } from 'src/app/core/pipes/course.pipe';
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

  course:any=[];
  counts:any=[];

  baseURL = environment.baseURL;
  dataLoad = false;
  constructor(public apiS:ApiService,public authS:AuthenticationService,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const coursePipe = new CoursePipe();
    this.dataService.getMyCoursesData().subscribe(data=>{
      data.data.forEach((element:any) => {
        const per = coursePipe.transform(element);
        element.percentage = per;
      })
      this.course = data.data;
      this.dataLoad = true;
    })
    this.dataService.getMyCoursesDoneData().subscribe(data=>{
      this.counts = data.data;
    });

  }

}
