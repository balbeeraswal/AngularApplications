import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircle as farCircle,faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium, faAngular } from '@fortawesome/free-brands-svg-icons';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { registrationModule } from './features/registration/registration.module';
import { loginApplicantModule } from './features/loginApplicant/login-applicant.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { AppHttpIntercepter } from './core/services/masterAPIs/interseptor.service';
import { bankBranchesService } from './core/services/masterAPIs/bankBranches.service';
import { DistrictsService } from './core/services/masterAPIs/districts.service';
import {  MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {TabsModule} from 'ngx-bootstrap/tabs'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMatDatetimePickerModule,NgxMatTimepickerModule,NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import {MatDialogModule} from '@angular/material/dialog';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertDialogComponentComponent } from './shared/common-featured-module/alert-dialog-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponentComponent



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    loginApplicantModule,
    HttpClientModule,
     MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatStepperModule,
BsDatepickerModule,
     
    TabsModule.forRoot()
  ],
  providers: [
  
  //   {
  //     provide:HTTP_INTERCEPTORS,
  //     useClass:AppHttpIntercepter,
  //     multi:true

  // }

],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library:FaIconLibrary)  {
    library.addIcons(faCircle,faSquare,farCircle,farSquare
      ,faStackOverflow,faGithub,faMedium);
  }
 }
