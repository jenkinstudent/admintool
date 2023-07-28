import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierRoutingModule } from './courier-routing.module';
import { CourierComponent } from './courier.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    CourierComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    CourierRoutingModule,
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
    NgbTooltipModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CourierModule { }
