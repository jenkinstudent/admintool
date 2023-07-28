import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllocationRoutingModule } from './allocation-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { ReportComponent } from './report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ManagerComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AllocationRoutingModule,
    SharedModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    DragDropModule
  ]
})
export class AllocationModule { }
