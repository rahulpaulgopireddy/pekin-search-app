import { Component } from '@angular/core';
import { UserauthService } from '../services/userauth.service';

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
  constructor(public userApiService: UserauthService) {}

  loginApi = () => {
    this.userApiService.loginUser(this.userCred).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error.status, error.message);
      }
    );
  };
}
