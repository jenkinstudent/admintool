import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'utility', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule)  },
  { path: 'courier', loadChildren: () => import('./courier/courier.module').then(m => m.CourierModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
