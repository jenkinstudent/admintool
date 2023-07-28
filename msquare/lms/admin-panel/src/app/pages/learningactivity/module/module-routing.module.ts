import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { ModuleComponent } from './module.component';

const routes: Routes = [
  {
    path:'',
    component:ModuleComponent
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
export class ModuleRoutingModule { }
