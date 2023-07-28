import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent {
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  winners:any = [];
  item:any;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public excelS:ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("Winner Report - Fusion Microfinance");
  }

  
  ngOnInit(): void {
    this.getData();
    this.breadCrumbItems = [
      { label: 'Reports' },
      { label: 'Winners Report' , active: true }
    ];
  }

  getData(){
    this.winners=[];
    this.api.allWinners().subscribe(data=>{
      this.winners = data.data;
      console.log(this.winners)
    });
  }

  getTop10Count(winners:any){
    let winnerCount = winners.filter((res:any)=>{return res.top10 == true})
    return winnerCount.length;
  }

  async openDetails(content:any, item:any){
    this.modalService.open(content,{size:'fullscreen'});
    await Promise.all(item.winners.map((examT:any) => {
      const date = moment(examT.quizScoreId.createdAt).tz('Asia/Kolkata');
      const split = examT.examTime.split(".");
      date.subtract(split[0], 'minutes');
      date.subtract(split[1], 'seconds');
      examT.examStartTime = date.toISOString();
    }));
    this.item = item;
  }
}
