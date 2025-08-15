import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appRegistrationRoutingModule } from './appRegistrationrouting.module';
import { applicationRegistrationComponent } from './applicationRegistration.component';
import { MaterialModule } from '../../shared/material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonFeaturedModuleModule } from '../../shared/common-featured-module/common-featured-module.module';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { MatTabsModule } from '@angular/material/tabs';
import { FormlyModule } from '@ngx-formly/core';
import { MatDialogModule } from "@angular/material/dialog";
import { AlertDialogComponentComponent } from 'src/app/shared/common-featured-module/alert-dialog-component.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { RegistrationLayoutComponent } from 'src/app/layout/registrationLayout/registration-layout.component';
@NgModule({
  declarations: [
    RegistrationLayoutComponent,
    applicationRegistrationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormlyModule,
    MatTabsModule,
    ReactiveFormsModule,
    CommonFeaturedModuleModule,
    BsDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    appRegistrationRoutingModule
  ]
})
export class appRegistrationModule { }
