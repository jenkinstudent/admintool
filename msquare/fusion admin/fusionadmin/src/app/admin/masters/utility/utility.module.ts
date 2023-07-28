import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { BreadComponent } from './bread/bread.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { UtilityComponent } from './utility.component';
import { NgxMaskModule } from 'ngx-mask';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    BreadComponent,
    UtilityComponent,
    MasterComponent
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
    NgxMaskModule.forRoot(),
  ],
  providers:[
    DatePipe
  ]
})
export class UtilityModule { }
