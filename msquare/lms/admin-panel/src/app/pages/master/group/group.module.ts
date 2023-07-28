import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GroupComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    NgbNavModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    DatePipe
  ]
})
export class GroupModule { }
