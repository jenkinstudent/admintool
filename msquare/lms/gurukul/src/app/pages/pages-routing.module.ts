import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeoComponent } from './ceo/ceo.component';
import { CalenderComponent } from './calender/calender.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { ActivityWallComponent } from './activity-wall/activity-wall.component';
import { TopwinnersComponent } from './topwinners/topwinners.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'news', component: NewsComponent},
  { path: 'ceo', component: CeoComponent},
  { path: 'my-programmes', loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)},
  { path: 'my-courses', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)},
  { path: 'my-modules', loadChildren: () => import('./module/module.module').then(m => m.ModuleModule)},
  { path: 'my-learning-activities', loadChildren: () => import('./learning-activity/learning-activity.module').then(m => m.LearningActivityModule)},
  { path: 'support', component: SupportComponent},
  { path: 'notification', component: NotificationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'calender', component: CalenderComponent},
  { path: 'certificates', component: CertificatesComponent},
  { path: 'active-wall', component: ActivityWallComponent},
  { path: 'top-winners', loadChildren: () => import('./topwinners/topwinners.module').then(m => m.TopwinnersModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
