import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { BreadComponent } from './bread/bread.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ProgramComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SharedModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    DragDropModule
  ]
})
export class ProgramModule { }
