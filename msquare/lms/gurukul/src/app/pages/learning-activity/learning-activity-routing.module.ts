import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ModuleDetailsComponent } from './module-details/module-details.component';
import { ModuleComponent } from './module/module.component';
import { ProgramComponent } from './program/program.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path:'',
    component:ProgramComponent
  },
  {
    path:'course/:index',
    component:CourseComponent
  },
  {
    path:'module/:index/:courseIndex',
    component:ModuleComponent
  },
  {
    path:'module-details/:index/:courseIndex/:moduleIndex',
    component:WatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningActivityRoutingModule { }
