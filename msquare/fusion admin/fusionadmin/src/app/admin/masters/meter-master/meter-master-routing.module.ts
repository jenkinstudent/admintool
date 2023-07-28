import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { MeterMasterComponent } from './meter-master.component';

const routes: Routes = [
  { path: '', component: MeterMasterComponent},
  { path: 'action/:action', component: BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterMasterRoutingModule { }
