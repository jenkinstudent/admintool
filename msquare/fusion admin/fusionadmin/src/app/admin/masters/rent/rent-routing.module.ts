import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { RentComponent } from './rent.component';

const routes: Routes = [
  { path: '', component: RentComponent},
  { path: 'action/:action', component: BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
