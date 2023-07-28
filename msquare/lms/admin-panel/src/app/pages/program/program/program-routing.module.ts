import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { ProgramComponent } from './program.component';

const routes: Routes = [
  {
    path:'',
    component:ProgramComponent
  },
  {
    path: 'activity/:action',
    component: BreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
