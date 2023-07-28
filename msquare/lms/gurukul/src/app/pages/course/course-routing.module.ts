import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './module/module.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path:'',
    component:CourseComponent
  },
  {
    path:'module/:index',
    component:ModuleComponent
  },
  {
    path:'module-details/:index/:courseIndex',
    component:WatchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
