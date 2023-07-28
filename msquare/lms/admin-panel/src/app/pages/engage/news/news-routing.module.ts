import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  {path:"", component:NewsComponent},
  {path:"action/:activity", component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
