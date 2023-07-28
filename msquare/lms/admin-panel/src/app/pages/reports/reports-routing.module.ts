import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionActivityComponent } from './session-activity/session-activity.component';
import { WinnersComponent } from './winners/winners.component';

const routes: Routes = [
  {path:'session-activity-report', component:SessionActivityComponent},
  {path:'winners-report', component:WinnersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
