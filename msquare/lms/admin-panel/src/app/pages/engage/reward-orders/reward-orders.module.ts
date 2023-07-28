import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardOrdersRoutingModule } from './reward-orders-routing.module';
import { RewardOrdersComponent } from './reward-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RewardOrdersComponent
  ],
  imports: [
    CommonModule,
    RewardOrdersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule
  ]
})
export class RewardOrdersModule { }
