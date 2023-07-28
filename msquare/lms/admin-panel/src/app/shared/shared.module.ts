import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule, NgbCarouselModule, NgbCollapseModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Counter
import { CountToModule } from 'angular-count-to';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';

import { GreetPipe } from '../core/pipes/greet.pipe';
import { FilterPipe } from '../core/pipes/filter.pipe';
import { FirstletterPipe } from '../core/pipes/firstletter.pipe';
import { ProgramPipe } from '../core/pipes/program.pipe';
import { CoursePipe } from '../core/pipes/course.pipe';
import { ModulePipe } from '../core/pipes/module.pipe';
import { ProgramCoursePipe } from '../core/pipes/program-course.pipe';
import { ProgramModulePipe } from '../core/pipes/program-module.pipe';
import { YoutubePipePipe } from '../core/pipes/youtube-pipe.pipe';
import { CourseModulePipe } from '../core/pipes/course-module.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../core/pipes/search.pipe';
import { TimeformatPipe } from '../core/pipes/timeformat.pipe';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    GreetPipe,
    FilterPipe,
    FirstletterPipe,
    BreadcrumbsComponent,
    ScrollspyDirective,
    ProgramPipe,
    CoursePipe,
    ModulePipe,
    ProgramCoursePipe,
    ProgramModulePipe,
    YoutubePipePipe,
    CourseModulePipe,
    SearchPipe,
    TimeformatPipe
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    SwiperModule,
    CountToModule,
    NgbNavModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    NgbCarouselModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgApexchartsModule,
    NgbProgressbarModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  exports: [GreetPipe,BreadcrumbsComponent,ScrollspyDirective,FilterPipe,FirstletterPipe,ProgramPipe,CoursePipe,ModulePipe,
  ProgramCoursePipe,ProgramModulePipe,YoutubePipePipe,CourseModulePipe,SearchPipe,TimeformatPipe]
})
export class SharedModule { }
