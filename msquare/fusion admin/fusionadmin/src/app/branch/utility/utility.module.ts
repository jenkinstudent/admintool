import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { UtilityComponent } from './utility.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { RaisedComponent } from './raised/raised.component';


@NgModule({
  declarations: [
    UtilityComponent,
    BreadComponent,
    DetailsComponent,
    RaisedComponent
  ],
  imports: [
    CommonModule,
    UtilityRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    NgbNavModule,
    NgbTooltipModule
  ]
})
export class UtilityModule { }
