import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // set the currenr year
  year: number = moment().tz('Asia/Kolkata').year();

  constructor() { }

  ngOnInit(): void {
  }

}
