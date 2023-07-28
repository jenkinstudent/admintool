import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShaktiComponent } from './shakti/shakti.component';

const routes: Routes = [
  { path: 'rent', loadChildren: () => import('./rent/rent.module').then(m => m.RentModule)  },
  { path: 'utility', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule)  },
  { path: 'meter', loadChildren: () => import('./meter-master/meter-master.module').then(m => m.MeterMasterModule)  },
  { path: 'shakti', loadChildren: () => import('./shakti/shakti.module').then(m => m.ShaktiModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
