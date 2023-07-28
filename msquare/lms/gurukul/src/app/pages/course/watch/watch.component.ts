import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  index:any;
  courseIndex:any;
  
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams: any) => {
      this.index = routeParams.index;
      this.courseIndex = routeParams.courseIndex;
    });
  }

}
