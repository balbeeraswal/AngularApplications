import { Component, OnInit, Optional } from '@angular/core';
import { Styles } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { masterServices } from 'src/app/core/services/masterAPIs/masterServices.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css']
})
export class AppComponent implements OnInit {
  categories:any;
  form: FormGroup;
  title = 'Disabled Marriage Application';
  subscription: Subscription;
  constructor(private router:Router,private formBuilder: FormBuilder,    private fb: FormBuilder,
      @Optional() private _masterServices: masterServices,){
 
  }
 ngOnInit(): void {
    this.form = this.formBuilder.group({
      control1: [
        ''
      ],
      control2: [
        ''
      ],
    });

    const control1 = <FormControl>this.form.get('control1');
    const control2 = <FormControl>this.form.get('control2');

    this.subscription = control1.valueChanges.subscribe(value => {
      if (value) {
        control2.setValidators([Validators.required, ])
      }
      else {
        control2.setValidators(null);
      }

      control2.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ApplicationRegistrationForm(){
    this.router.navigate(['/appRegistration']);

  }

}


