import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path:'',
    component:QuizComponent
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
export class QuizRoutingModule { }
