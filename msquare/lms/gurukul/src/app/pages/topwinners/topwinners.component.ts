import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-topwinners',
  templateUrl: './topwinners.component.html',
  styleUrls: ['./topwinners.component.scss']
})
export class TopwinnersComponent implements OnInit {

  statePieChart: any;
  departmentPieChart: any;
  scorePieChart: any;

  id="";

  certified:any=[];
  top100winners:any = [];
  winners:boolean = false;
  analytics:boolean = false;
  openingDate:any="";
  questionBankTitle:any="";

  baseURL=environment.baseURL;
  resultAnnouceTime:any;
  resultAnnouceQuiz:any;
  resultAnnouncing:any = false;

  constructor(public authS:AuthenticationService,public apiS:ApiService,public route:ActivatedRoute,public router:Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      this.id = data.id;
      this._fetchData();
    })
    
    
  }

  _fetchData(){
    this.dataService.getRecentOpenQuiz(100).subscribe(data=>{
      if(data.data){
        this.resultAnnouceTime = data.resultTime;
        this.resultAnnouncing = true;
        this.resultAnnouceQuiz = data.quiz;
      }else{
        this.resultAnnouncing = false;
      }
    })
    this.dataService.getTopWinners().subscribe(async data=>{
      if(data.data != undefined){
        this.questionBankTitle = data.data?.quizId?.title;
        this.openingDate = data.data.quizId?.learningLiveDate;
        await Promise.all(data.data.winners.map((examT:any) => {
          const date = moment(examT.quizScoreId.createdAt).tz('Asia/Kolkata');
          const split = examT.examTime.split(".");
          date.subtract(split[0], 'minutes');
          date.subtract(split[1], 'seconds');
          examT.examStartTime = date.toISOString();
        }));
        this.certified = data.data.winners;
      }
    })

  }

}
