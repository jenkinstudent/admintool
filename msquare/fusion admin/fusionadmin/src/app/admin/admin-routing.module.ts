import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierDetailsComponent } from './courier-details/courier-details.component';
import { CourierTransactionComponent } from './courier-transaction/courier-transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RentRaisedComponent } from './rent-raised/rent-raised.component';
import { RentTransactionComponent } from './rent-transaction/rent-transaction.component';
import { RentTransdetailsComponent } from './rent-transdetails/rent-transdetails.component';
import { UtilityBulkapproveComponent } from './utility-bulkapprove/utility-bulkapprove.component';
import { UtilityTransdetailsComponent } from './utility-transdetails/utility-transdetails.component';
import { UtiltyTransactionComponent } from './utilty-transaction/utilty-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'utility-transaction', component: UtiltyTransactionComponent},
  { path: 'utility-transaction-details/:id', component: UtilityTransdetailsComponent},
  { path: 'utility-bulk-approve/:type', component: UtilityBulkapproveComponent},
  { path: 'rent-transaction-details/:id', component: RentTransdetailsComponent},
  { path: 'courier-transaction', component: CourierTransactionComponent},
  { path: 'courier-transaction-details/:id', component: CourierDetailsComponent},
  { path: 'rent-raised/:activity/:id', component: RentRaisedComponent},
  { path: 'rent-transaction', component: RentTransactionComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule)  },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
