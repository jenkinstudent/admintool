import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { BreadComponent } from './bread/bread.component';


@NgModule({
  declarations: [
    RentComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    RentRoutingModule
  ]
})
export class RentModule { }
