import { Component } from '@angular/core';
import { FormvalidationService } from '../services/formvalidation.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserauthService } from '../services/userauth.service';
import { Router } from '@angular/router';
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
  // signUpForm: FormGroup | signFormInterface | undefined | null = null;
  registerForm: any = FormGroup;
  signUpForm: any = FormGroup;
  submitted = false;
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  serverMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    public userApiService: UserauthService,
    private fb: FormBuilder,
    private _formValidator: FormvalidationService,
    private router: Router
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

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  get signUpFormControl() {
    // @ts-ignore
    return this.signUpForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    const { username, email, password } = this.form;
    const userCred = {
      username: username,
      email: email,
      password: password,
    };

    this.userApiService.createUser(userCred).subscribe(
      (res) => {
        console.log(res);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log(this.router.navigate(['/login']));
      },
      (error) => {
        console.log(error.status, error.message);
        this.serverMessage = error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
