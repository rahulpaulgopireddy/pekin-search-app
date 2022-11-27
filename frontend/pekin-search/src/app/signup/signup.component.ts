import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormvalidationService } from '../services/formvalidation.service';

interface signFormInterface {
  username: any;
  password: any;
  confirmpassowrd: any;
  email: any;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup | signFormInterface | undefined | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _formValidator: FormvalidationService
  ) {}
  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this._formValidator.patternValidator,
          ]),
        ],
        confirmpassword: ['', Validators.required],
      },
      {
        validator: this._formValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  get signUpFormControl() {
    // @ts-ignore
    return this.signUpForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    if (this.signUpForm.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      // @ts-ignore
      console.table(this.signUpForm.value);
    }
  }
}
