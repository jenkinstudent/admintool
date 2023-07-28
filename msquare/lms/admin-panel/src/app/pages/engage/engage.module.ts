import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngageRoutingModule } from './engage-routing.module';
import { TrainingGlimpseComponent } from './training-glimpse/training-glimpse.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    TrainingGlimpseComponent,
  ],
  imports: [
    CommonModule,
    EngageRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EngageModule { }
