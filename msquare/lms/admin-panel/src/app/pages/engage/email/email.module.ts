import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbAccordionModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';


@NgModule({
  declarations: [
    EmailComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    SharedModule,
    CKEditorModule,
    SimplebarAngularModule,
    NgbAccordionModule,
    NgbNavModule
  ]
})
export class EmailModule { }
