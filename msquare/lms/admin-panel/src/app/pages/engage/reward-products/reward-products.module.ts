import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardProductsRoutingModule } from './reward-products-routing.module';
import { RewardProductsComponent } from './reward-products.component';
import { BreadComponent } from './bread/bread.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RewardProductsComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    RewardProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule
  ]
})
export class RewardProductsModule { }
