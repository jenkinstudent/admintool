import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { allIcons } from 'angular-feather/icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { NgbDropdownModule, NgbNavModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FeatherModule } from 'angular-feather';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateComponent } from './create/create.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    DashboardComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    WidgetModule,
    LeafletModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgbTooltipModule,
    NgbPopoverModule,
    FeatherModule,
    NgbNavModule,
    SharedModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AdminModule { }
