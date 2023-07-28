import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShaktiRoutingModule } from './shakti-routing.module';
import { BreadComponent } from './bread/bread.component';
import { ShaktiComponent } from './shakti.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    BreadComponent,
    ShaktiComponent
  ],
  imports: [
    CommonModule,
    ShaktiRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    
  ]
})
export class ShaktiModule { }
