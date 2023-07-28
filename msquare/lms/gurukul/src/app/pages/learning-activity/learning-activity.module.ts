import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningActivityRoutingModule } from './learning-activity-routing.module';
import { ProgramComponent } from './program/program.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';
import { ModuleComponent } from './module/module.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbCarouselModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [
    ProgramComponent,
    ModuleDetailsComponent,
    ModuleComponent,
    CourseComponent,
    WatchComponent
  ],
  imports: [
    CommonModule,
    LearningActivityRoutingModule,
    NgbNavModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    NgbCarouselModule,
    NgbCollapseModule,
    NgbAccordionModule,
    SharedModule,
    NgbProgressbarModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class LearningActivityModule { }
