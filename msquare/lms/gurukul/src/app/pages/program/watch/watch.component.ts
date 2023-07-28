import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  id:any="";
  index:any="";
  courseIndex:any;
  moduleIndex:any;
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.route.params.subscribe((routeParams: any) => {
      this.index = '';
      this.courseIndex= '';
      this.moduleIndex= '';

      this.index = routeParams.index;
      this.courseIndex= routeParams.courseIndex;
      this.moduleIndex= routeParams.moduleIndex;
    });
  }


}
