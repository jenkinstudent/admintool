import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopwinnersRoutingModule } from './topwinners-routing.module';
import { TopsidebarComponent } from './topsidebar/topsidebar.component';
import { TopwinnersComponent } from './topwinners.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbCarouselModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TopsidebarComponent,
    TopwinnersComponent
  ],
  imports: [
    CommonModule,
    TopwinnersRoutingModule,
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
export class TopwinnersModule { }
