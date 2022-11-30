import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import data from '../../assets/response.json';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserauthService } from '../services/userauth.service';

@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.css'],
})
export class SearchtableComponent {
  userFeed: any;
  searchTag = 'Test';
  spinnerStyle = Spinkit;
  isLoading = true;
  typeSelected: string;
  totalResults: number;
  tweetsArr = [];
  userCred = {
    email: 'rp16888@gmail.com',
    password: 'Fall@2022',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private _userfeedservice: UserauthService
  ) {
    // console.log(data);
  }

  search(paramsString) {
    // this._userfeedservice = paramsString;
    this.isLoading = false;
    // this._userfeedservice.loginUser(this.userCred).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log(error.status, error.message);
    //   }
    // )
    this._userfeedservice.getUserFeed(this.searchTag).subscribe((data: any) => {
      this.userFeed = data;
      if (this.userFeed) {
        this.isLoading = false;
        // console.log(data.tweets);
        this.tweetsArr = this.userFeed.tweets;
        this.totalResults = this.tweetsArr.reduce(
          (a, obj) => a + Object.keys(obj).length,
          0
        );
        console.log(data);
      }
    });
    // if (data) {
    //   this.isLoading = false;
    //   // console.log(data.tweets);
    //   this.tweetsArr = data.tweets;
    //   this.totalResults = this.tweetsArr.reduce(
    //     (a, obj) => a + Object.keys(obj).length,
    //     0
    //   );
    //   console.log(data);
    // }
  }

  ngOnInit() {
    /** spinner starts on init */
  }
}
