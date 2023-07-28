import { Component, OnInit } from '@angular/core';
import { ModulePipe } from 'src/app/core/pipes/module.pipe';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  module:any=[];
  counts:any=[];

  baseURL = environment.baseURL;
  dataLoad  = false;
  constructor(public apiS:ApiService,public authS:AuthenticationService,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const modulePipe = new ModulePipe();
    this.dataService.getMyModulesData().subscribe(data=>{
      data.data.forEach((element:any) => {
        const per = modulePipe.transform(element);
        element.percentage = per;
      });
      this.module = data.data;
      this.dataLoad = true;
    })
    this.dataService.getMyModulesDoneData().subscribe(data=>{
      this.counts = data.data;
    });
  }

}
