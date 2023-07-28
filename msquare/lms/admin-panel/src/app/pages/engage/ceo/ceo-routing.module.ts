import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeoComponent } from './ceo.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  {path:"", component:CeoComponent},
  {path:"action/:activity", component:BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeoRoutingModule { }
