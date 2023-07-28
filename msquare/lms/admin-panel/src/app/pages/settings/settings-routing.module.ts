import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'profile-photo-approval',component:ProfilePhotoComponent},
  {path:'employee-registration',component:EmployeeRegistrationComponent},
  {path:'users',component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
