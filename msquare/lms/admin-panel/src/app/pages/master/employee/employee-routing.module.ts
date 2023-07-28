import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  { path:'',component:EmployeeComponent},
  { path:'action/:action',component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
