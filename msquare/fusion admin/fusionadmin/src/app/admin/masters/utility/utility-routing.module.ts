import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { MasterComponent } from './master/master.component';
import { UtilityComponent } from './utility.component';

const routes: Routes = [
  { path: '', component: UtilityComponent},
  { path: 'action/:action', component: BreadComponent},
  { path: 'master', component: MasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
