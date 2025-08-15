import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { applicationRegistrationComponent } from './applicationRegistration.component';
import { RegistrationLayoutComponent } from 'src/app/layout/registrationLayout/registration-layout.component';

const routes: Routes = [
  {
    path:'',
    component:RegistrationLayoutComponent,
    children:[
      {
        path:'applicationregistration',component:applicationRegistrationComponent
      }
    ]   
  }
  ,
  // { path: '', component: applicationRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class appRegistrationRoutingModule { }
