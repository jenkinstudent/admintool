import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role.module';

const routes: Routes = [
  { path:'',redirectTo:'admin',pathMatch: 'full'},
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard],data:{roles:Role.Admin}},
  { path: 'branch', component: LayoutComponent, loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule),canActivate:[AuthGuard],data:{roles:Role.Branch}},
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
