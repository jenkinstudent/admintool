import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UsersComponent } from './users/users.component';
import { SimplebarAngularModule } from 'simplebar-angular';


@NgModule({
  declarations: [
    ProfilePhotoComponent,
    EmployeeRegistrationComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    TranslateModule,
    SimplebarAngularModule
  ]
})
export class SettingsModule { }
