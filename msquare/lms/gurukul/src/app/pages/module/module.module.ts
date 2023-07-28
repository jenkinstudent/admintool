import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module/module.component';
import { NgbNavModule, NgbCarouselModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  declarations: [
    ModuleComponent,
    WatchComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
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
    SharedModule
  ]
})
export class ModuleModule { }
