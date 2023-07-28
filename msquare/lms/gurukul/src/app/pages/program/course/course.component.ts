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
  counts:any =[];

  programIndex:any="";
  id:any="";
  baseURL = environment.baseURL;
  constructor(public apiS:ApiService,public authS:AuthenticationService,public route:ActivatedRoute,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const programCoursePipe = new ProgramCoursePipe();
    this.route.params.subscribe((params:any)=>{
      this.programIndex = params.index;
      this.dataService.getMyProgramsData().subscribe(data=>{
        let courses = data.data[this.programIndex].courses;
        courses.forEach((element:any) => {
          const per = programCoursePipe.transform(element);
          element.percentage = per;
        });
        this.courses = courses;
        this.dataService.getMyProgramsCoursesDoneData(data.data[this.programIndex]._id).subscribe(data=>{
          this.counts = data.data;
        });
        const pdata = JSON.stringify({
          "isWatch": true
        })
        this.apiS.updateProgramsWatchForProgram(pdata,data.data[this.programIndex]._id).subscribe(result =>{
          data.data[this.programIndex].isWatch = true;
        })
      })
      
    })
   
    
  }

}
