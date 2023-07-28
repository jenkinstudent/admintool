import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './module/module.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path:'',
    component:ModuleComponent
  },
  {
    path:'module-details/:index',
    component:WatchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
