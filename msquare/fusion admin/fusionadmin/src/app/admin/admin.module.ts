import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
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
import { UtiltyTransactionComponent } from './utilty-transaction/utilty-transaction.component';
import { CourierTransactionComponent } from './courier-transaction/courier-transaction.component';
import { RentTransactionComponent } from './rent-transaction/rent-transaction.component';
import { UtilityTransdetailsComponent } from './utility-transdetails/utility-transdetails.component';
import { RentTransdetailsComponent } from './rent-transdetails/rent-transdetails.component';
import { NgxMaskModule } from 'ngx-mask';
import { UtilityDashboardComponent } from './utility-dashboard/utility-dashboard.component';
import { RentDashboardComponent } from './rent-dashboard/rent-dashboard.component';
import { CourierDetailsComponent } from './courier-details/courier-details.component';
import { RentRaisedComponent } from './rent-raised/rent-raised.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilityBulkapproveComponent } from './utility-bulkapprove/utility-bulkapprove.component';
import { CourierBulkapproveComponent } from './courier-bulkapprove/courier-bulkapprove.component';
import { RentBulkapproveComponent } from './rent-bulkapprove/rent-bulkapprove.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    DashboardComponent,
    UtiltyTransactionComponent,
    CourierTransactionComponent,
    RentTransactionComponent,
    UtilityTransdetailsComponent,
    RentTransdetailsComponent,
    UtilityDashboardComponent,
    RentDashboardComponent,
    CourierDetailsComponent,
    RentRaisedComponent,
    UtilityBulkapproveComponent,
    CourierBulkapproveComponent,
    RentBulkapproveComponent,
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
    NgSelectModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    DatePipe
  ]
})
export class AdminModule { }
