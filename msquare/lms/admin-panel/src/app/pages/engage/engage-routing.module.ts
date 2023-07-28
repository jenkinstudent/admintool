import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingGlimpseComponent } from './training-glimpse/training-glimpse.component';

const routes: Routes = [
  { path: 'training-glimpse', component: TrainingGlimpseComponent},
  { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)  },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule)  },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule)  },
  { path: 'reward-products', loadChildren: () => import('./reward-products/reward-products.module').then(m => m.RewardProductsModule)  },
  { path: 'reward-orders', loadChildren: () => import('./reward-orders/reward-orders.module').then(m => m.RewardOrdersModule)  },
  { path: 'ceo-message', loadChildren: () => import('./ceo/ceo.module').then(m => m.CeoModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngageRoutingModule { }
