import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NgbCarouselModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { HelpComponent } from './help/help.component';
import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    ActiveWallComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbNavModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    CKEditorModule,
    NgSelectModule,
    TranslateModule,
    NgbTooltipModule,
    SimplebarAngularModule
  ]
})
export class PagesModule { }
