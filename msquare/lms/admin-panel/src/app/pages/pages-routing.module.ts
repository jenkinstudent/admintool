import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'active-wall', component: ActiveWallComponent},
  { path: 'help', component: HelpComponent},
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule)  },
  { path: 'engage', loadChildren: () => import('./engage/engage.module').then(m => m.EngageModule)  },
  { path: 'programs', loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)  },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)  },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)  },
  { path: 'allocation', loadChildren: () => import('./allocation/allocation.module').then(m => m.AllocationModule)  },
  { path: 'learning-activity', loadChildren: () => import('./learningactivity/learningactivity.module').then(m => m.LearningactivityModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
