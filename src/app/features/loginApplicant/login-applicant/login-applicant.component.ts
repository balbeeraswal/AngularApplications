import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl}  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { applicantLoginService } from 'src/app/core/services/masterAPIs/applicantLoginService.service';
@Component({
  selector: 'app-login-applicant',
  templateUrl: './login-applicant.component.html',
  styleUrls: ['./login-applicant.component.css']
})
export class loginApplicantComponent {
   loginApplicantForm;
   loginId:string;
   password:string;
   loginResult:any;

   @ViewChild('loginId', { static: false }) loginIdValue: ElementRef;
   @ViewChild('password', { static: false }) passwordValue: ElementRef;

  
  constructor(private fb:FormBuilder,private applicantLoginservice:applicantLoginService)
  {
   this.loginApplicantForm=this.fb.group(
    {
      loginId:['',[Validators.maxLength(30),Validators.required],],
      password:['',[Validators.maxLength(50),Validators.required],]
    }

   )
  }

  onSubmit() {
    this.loginId=this.loginIdValue.nativeElement.value;
    this.password=this.passwordValue.nativeElement.value;
    this.applicantLoginservice.Login(this.loginId,this.password)
    .subscribe((result)=>{
      this.loginResult=result
    });
     console.log(this.loginResult);
  }

}
