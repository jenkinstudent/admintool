import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

/**
 * Bread Crumbs Component
 */
export class BreadcrumbsComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() isBack: string | undefined;

  @Input() name: string | undefined;
  // @Input()
  // breadcrumbItems!: Array<{
  //   active?: boolean;
  //   label?: string;
  // }>;

  Item!: Array<{
    label?: string;
  }>;

  constructor(public location:Location, public authS:AuthenticationService) { }

  ngOnInit(): void {
  }

}
