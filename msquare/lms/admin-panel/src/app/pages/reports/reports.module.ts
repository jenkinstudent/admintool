import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SessionActivityComponent } from './session-activity/session-activity.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { WinnersComponent } from './winners/winners.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SessionActivityComponent,
    WinnersComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    NgbNavModule
  ]
})
export class ReportsModule { }
