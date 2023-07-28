import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeoRoutingModule } from './ceo-routing.module';
import { CeoComponent } from './ceo.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CeoComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    CeoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    SharedModule
  ]
})
export class CeoModule { }
