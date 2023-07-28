import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { CourierComponent } from './courier.component';

const routes: Routes = [
  { path: '', component: CourierComponent},
  { path: 'action/:action', component: BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierRoutingModule { }
