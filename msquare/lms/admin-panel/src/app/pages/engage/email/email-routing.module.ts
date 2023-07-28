import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  {path:"", component:EmailComponent},
  {path:"activity/:activity", component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
