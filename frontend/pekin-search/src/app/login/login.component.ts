import { Component } from '@angular/core';
import { UserauthService } from '../services/userauth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userCred = {
    email: 'rp16888@gmail.com',
    password: 'Fall@2022',
  };
  isshowserverError = false;
  isshowserverErrorString = '';
  registerForm: any = FormGroup;
  submitted = false;
  constructor(
    public userApiService: UserauthService,
    private formBuilder: FormBuilder
  ) {}
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // console.log(this.registerForm);
    // this.userCred.email = this.registerForm.get['email'].value;
    // this.userCred.password = this.registerForm.get['password'].value;
    // console.log(this.userCred);
    // console.log(this.f());

    console.log(this.registerForm.value);
    //True if all the fields are filled
    if (this.submitted) {
      this.loginApi(this.registerForm.value);
    }
  }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginApi = (params) => {
    this.userApiService.loginUser(params).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error.status, error.message);
        this.isshowserverErrorString = error.message;
        this.isshowserverError = true;
      }
    );
  };
}
