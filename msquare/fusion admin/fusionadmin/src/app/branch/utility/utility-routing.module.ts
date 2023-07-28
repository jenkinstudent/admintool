import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { DetailsComponent } from './details/details.component';
import { RaisedComponent } from './raised/raised.component';
import { UtilityComponent } from './utility.component';

const routes: Routes = [
  { path: '', component: UtilityComponent},
  { path: 'action/:action', component: BreadComponent},
  { path: 'details/:action', component: DetailsComponent},
  { path: 'raised/:id', component: RaisedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
