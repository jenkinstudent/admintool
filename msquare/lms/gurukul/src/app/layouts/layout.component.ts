import { Component, OnInit } from '@angular/core';

import {
  LAYOUT_HORIZONTAL
} from './layout.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

/**
 * Layout Component
 */
export class LayoutComponent implements OnInit {

  layoutType!: string;

  constructor() { }

  ngOnInit(): void {
    this.layoutType = LAYOUT_HORIZONTAL;
    
  }


}
