import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)  },
  { path: 'group', loadChildren: () => import('./group/group.module').then(m => m.GroupModule)  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
