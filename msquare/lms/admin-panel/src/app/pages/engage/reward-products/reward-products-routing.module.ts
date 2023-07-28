import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardProductsComponent } from './reward-products.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  {path:"", component:RewardProductsComponent},
  {path:"action/:activity", component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardProductsRoutingModule { }
