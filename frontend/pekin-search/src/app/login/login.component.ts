import { Component } from '@angular/core';
import { UserauthService } from '../services/userauth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  get f() {
    return this.registerForm.controls;
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
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
        console.log(this.router.navigate(['/dashboard/feed']));
      },
      (error) => {
        console.log(error.status, error.message);
        this.isshowserverErrorString = error.message;
        this.isshowserverError = true;
      }
    );
  };
}
