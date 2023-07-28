import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbCarouselModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewsComponent } from './news/news.component';
import { CeoComponent } from './ceo/ceo.component';
import { SupportComponent } from './support/support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { CalenderComponent } from './calender/calender.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityWallComponent } from './activity-wall/activity-wall.component';
import { NgxMaskModule } from 'ngx-mask';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    DashboardComponent,
    NewsComponent,
    CeoComponent,
    SupportComponent,
    NotificationComponent,
    ProfileComponent,
    CalenderComponent,
    CertificatesComponent,
    ActivityWallComponent
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
    ImageCropperModule,
    PdfViewerModule
  ]
})
export class PagesModule { }
