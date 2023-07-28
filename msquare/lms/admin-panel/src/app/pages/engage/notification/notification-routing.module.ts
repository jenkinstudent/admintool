import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  {path:"", component:NotificationComponent},
  {path:"action/:activity", component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
