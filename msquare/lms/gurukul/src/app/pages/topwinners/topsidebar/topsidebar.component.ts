import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-topsidebar',
  templateUrl: './topsidebar.component.html',
  styleUrls: ['./topsidebar.component.scss']
})
export class TopsidebarComponent implements OnInit {

  public DownCollapsed = false;
  public FilterCollapsed = false;

  @Input() id: string | undefined;
  
  programmes:any=[];
  constructor(public apiS:ApiService,public authS:AuthenticationService, private dataService: DataService) { }

  ngOnInit(): void {
      this._fetchData();
  }

  _fetchData(){
    this.dataService.getMyLearningActivityData().subscribe(data=>{
      this.programmes = data.data;
    })
  }
}
