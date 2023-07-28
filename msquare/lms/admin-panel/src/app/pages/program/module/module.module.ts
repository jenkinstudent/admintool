import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { BreadComponent } from './bread/bread.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ModuleComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    DragDropModule
  ]
})
export class ModuleModule { }
