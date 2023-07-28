import { Component, OnInit } from '@angular/core';
import { ProgramPipe } from 'src/app/core/pipes/program.pipe';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  programs:any=[];
  counts:any=[];
  baseURL = environment.baseURL;
  submitA:boolean=false;
  rating=0;
  dataLoad = false;

  constructor(public apiS:ApiService,public authS:AuthenticationService,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const programPipe = new ProgramPipe();
    this.dataService.getMyProgramsData().subscribe(data=>{
      data.data.forEach((element:any) => {
        const per = programPipe.transform(element);
        element.percentage = per;
        element.modulesLength = 0;
        element.courses.forEach((cr:any) => {
          element.modulesLength = (element.modulesLength*1) + (cr.module.length);
        })
      });
      this.programs = data.data;
      this.dataLoad = true;
    })
    this.dataService.getMyProgramsDoneData().subscribe(data=>{
      this.counts = data.data;
    });

    
  }

}
