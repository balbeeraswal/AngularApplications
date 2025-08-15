import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function markAllDirty(control: AbstractControl): void {
  // control is FormGroup with some nested FormControl
  control.markAsDirty({ onlySelf: true });
  // ok formGroup is markedAsDirty, nice.

  // // let's call the following for its nested FormControls
  // (control as any)._forEachChild((control: any) => {
  //    // control.markAllAsDirty is undefined, no method call, no control.markAsDirty({ onlySelf: true }); 
  //    control.markAllAsDirty?.();
  // });
  // FormControl have no markAllAsDirty method... so will never be called for them
}

export function gte(Val: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = +control.value;
    if (isNaN(v)) {
      return { gte: true, requiredValue: v };
    }
    if (v < Val) {
      return { gte: true, requiredValue: v };
    }
    return null;
  };
}

export function ukStaygtAge(ageOfApplicant: string): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(ageOfApplicant);
    if (!control || !control.parent) {
      return null;
    }
    //if another validator already found an error on second control

    if (control.errors && !control.errors.durofStayInuk) {
      return null;
    }
    // console.log(control.parent.get(ageOfApplicant)?.value)
    // console.log(control.value)

    return control.parent.get(ageOfApplicant)?.value >= control.value ? null
      : { durofStayInuk: true };
  };
}

export function mustMatchTwoFiledsVal(
  firstControl: any,
  secondControl: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const firstcontrol = control.get(firstControl);
    const secondcontrol = control.get(secondControl);
    if (!firstcontrol || !secondcontrol) {

      return null;
    }

    //if another validator already found an error on second control

    if (secondcontrol.errors && !secondcontrol.errors.matchValOfTwoFields) {
      return null;
    }

    if (firstcontrol.value !== secondcontrol.value) {
      console.log(firstcontrol.value);
        console.log(secondcontrol.value);
      secondcontrol.setErrors({ mustMatchTwoFiledsVal: true });
       
    } else {
      secondcontrol.setErrors(null);
    }
    return null;
  };
}
