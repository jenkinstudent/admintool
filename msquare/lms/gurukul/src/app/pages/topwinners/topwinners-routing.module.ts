import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopwinnersComponent } from './topwinners.component';

const routes: Routes = [
  {
    path:':id',
    component:TopwinnersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopwinnersRoutingModule { }
