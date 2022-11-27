import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

const returnNullVal: any = null;

@Injectable({
  providedIn: 'root',
})
export class FormvalidationService {
  constructor() {}

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return returnNullVal;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? returnNullVal : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    // @ts-ignore
    return (formGroup: FormGroup): null | undefined => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordController = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordController) {
        return null;
      }
      if (
        confirmPasswordController.errors &&
        !confirmPasswordController.errors['passwordMismatch']
      ) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordController.value) {
        confirmPasswordController.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordController.setErrors(null);
      }
    };
  }
  userNameValidator(userControl: AbstractControl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return UserList.indexOf(userName) > -1;
  }
}
