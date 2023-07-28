import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.scss']
})
export class CeoComponent implements OnInit {

  chairman:any=[];

  ceos:any=[];
  data:any=[];

  baseURL=environment.baseURL;
  index:any="";
  constructor(public authService:AuthenticationService,public apiS:ApiService,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    this.dataService.getCEOs().subscribe(data => {
      this.data = data.data;
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].default){
          this.index= i;
          this.chairman = data.data[i];
        }
      }
    })
  }


  select(index:any){
    this.index ="";
    this.index = index;
    this.chairman=[];
    for(let i=0;i<this.data.length;i++){
      if(i == index){
        this.chairman = this.data[i];
      }
    }
  }


}
