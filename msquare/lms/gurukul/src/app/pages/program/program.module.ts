import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program/program.component';
import { NgbNavModule, NgbCarouselModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './module/module.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [
    ProgramComponent,
    CourseComponent,
    ModuleComponent,
    WatchComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
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
    TranslateModule
  ]
})
export class ProgramModule { }

