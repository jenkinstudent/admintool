import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { NgbNavModule, NgbCarouselModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleComponent } from './module/module.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [
    CourseComponent,
    ModuleComponent,
    WatchComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgbNavModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    NgbCarouselModule,
    NgbCollapseModule,
    NgbAccordionModule,
    SharedModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    TranslateModule,
    SharedModule
  ]
})
export class CourseModule { }
