import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-session-activity',
  templateUrl: './session-activity.component.html',
  styleUrls: ['./session-activity.component.scss']
})
export class SessionActivityComponent {
  printData:any=[];
  employeesData:any = [];
  loading = false;
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  page:any;
  totalPages:any="";
  hasMore:boolean = false;
  kpi = {
    total:0,
    today:0,
    sevenDay:0
  }

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public excelS:ExcelService) {
    this.title.setTitle("Session Activity - Fusion Microfinance");
  }

  
  ngOnInit(): void {
    this.getData();
    this.breadCrumbItems = [
      { label: 'Reports' },
      { label: 'Session Activity Report' , active: true }
    ];
  }

  getData(){
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(1,this.searchTerm,"").subscribe(data=>{
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasMore = data.hasMore;
      data.data.map((res:any) => {
        if(res.logoutTime != undefined && res.lastLoginOn != undefined){
          if(moment(res.logoutTime).tz('Asia/Kolkata').valueOf() > moment(res.lastLoginOn).tz('Asia/Kolkata').valueOf()){
            res.timeDuration = '-';
          }else{
            const lastLoginOn = moment(res.lastLoginOn).tz('Asia/Kolkata');
            const logoutTime = moment(res.logoutTime).tz('Asia/Kolkata');
            const duration = moment.duration(lastLoginOn.diff(logoutTime));
            const hh = duration.hours().toString().padStart(2, '0');
            const mm = duration.minutes().toString().padStart(2, '0');
            const ss = duration.seconds().toString().padStart(2, '0');
            res.timeDuration = `${hh}:${mm}:${ss}`;
          }
        }else{
          res.timeDuration = '-';
        }
      })
      this.employeesData = data.data;
      this.kpi = data.kpi;
      this.loading = false;
    });
    this.api.getAllSessionActivity().subscribe(data=>{
      this.printData=data.data;
    });
  }


  exportAsXLSX():void {
      const dToday = moment().tz('Asia/Kolkata');
      const toToday = dToday.format('YYYY-MM-DD-HH-mm-ss');
      this.excelS.exportAsExcelFile(this.printData, 'Session Activity Data '+ toToday);
  }

  next(){
    this.page = (this.page*1) + (1*1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page,this.searchTerm,"").subscribe(data=>{
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  previous(){
    this.page = (this.page*1) - (1*1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page,this.searchTerm,"").subscribe(data=>{
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.getData();
  }
}
