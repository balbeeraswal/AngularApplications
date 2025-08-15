import { Routes } from "@angular/router";
import { EditOldAgeApplicationComponent } from "./edit-old-age-application/edit-old-age-application.component";
import { isApplicantLoginGuard } from "src/app/core/services/authGuardService";
import { loginApplicantComponent } from "./login-applicant/login-applicant.component";
export const loginApplicantRoutes: Routes = [
  {path:'app-login-applicant',component:loginApplicantComponent},
  {
    path: 'app-edit-old-age-application', component: EditOldAgeApplicationComponent,
    canActivate: [isApplicantLoginGuard]
   
  },
  
];


