import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path:'',
    component:CourseComponent
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
export class CourseRoutingModule { }
