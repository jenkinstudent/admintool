import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  fusionNews:any=[];
  otherNews:any=[];

  baseURL=environment.baseURL;
  constructor(public authService:AuthenticationService,public apiS:ApiService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    this.apiS.newsByCategory('Fusion').subscribe(data=>{
      this.fusionNews = data.data;
    })

    this.apiS.newsByCategory('Other').subscribe(data=>{
      this.otherNews = data.data;
    })
  }

  displayFullNews(index:any,type:number){
    if(type == 1){
      let newsSection = $("#newsFusion"+index)
      newsSection.removeClass("news");
      $("#knowMoreFusion"+index).css("display","none");
      $("#knowLessFusion"+index).css("display","unset");
    } else {
      let newsSection = $("#newsOther"+index)
      newsSection.removeClass("news");
      $("#knowMoreOther"+index).css("display","none");
      $("#knowLessOther"+index).css("display","unset");
    }
    
    
  }

  hideFullNews(index:any,type:number){
    if(type == 1){
      let newsSection = $("#newsFusion"+index)
      newsSection.addClass("news");
      $("#knowMoreFusion"+index).css("display","unset");
      $("#knowLessFusion"+index).css("display","none");
    } else {
      let newsSection = $("#newsOther"+index)
      newsSection.addClass("news");
      $("#knowMoreOther"+index).css("display","unset");
      $("#knowLessOther"+index).css("display","none");
    }
    
    
  }

}
