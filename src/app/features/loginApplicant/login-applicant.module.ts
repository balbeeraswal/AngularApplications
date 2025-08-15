import { loginApplicantComponent } from "./login-applicant/login-applicant.component";
import { EditOldAgeApplicationComponent } from "./edit-old-age-application/edit-old-age-application.component";
import { NgModule } from "@angular/core";
import { loginApplicantRoutes } from "./loginApplicantRouting.routes";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
// import { MatDatepickerModule } from "@angular/material/datepicker";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
// import { MatNativeDateModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/material-module.module";

@NgModule
({
    declarations:[loginApplicantComponent,EditOldAgeApplicationComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSelectModule,
        MatIconModule,
        RouterModule.forChild(loginApplicantRoutes)
    ],
    providers:[],
    bootstrap:[]

})
export class loginApplicantModule
{

}
    
