import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { ShaktiComponent } from './shakti.component';

const routes: Routes = [
  { path: '', component: ShaktiComponent},
  { path: 'action/:action', component: BreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShaktiRoutingModule { }
