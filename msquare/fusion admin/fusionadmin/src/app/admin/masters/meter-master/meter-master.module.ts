import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterMasterRoutingModule } from './meter-master-routing.module';
import { MeterMasterComponent } from './meter-master.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MeterMasterComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    MeterMasterRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    NgbNavModule
  ]
})
export class MeterMasterModule { }
