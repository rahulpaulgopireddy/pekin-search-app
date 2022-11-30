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
  isLoading = false;
  typeSelected: string;
  totalResults: number;
  tweetsArr = [];
  isloadedData = false;
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

  onSearchChange(searchValue: string): void {
    this.searchTag = searchValue;
  }

  search(paramsString) {
    this.isLoading = true;
    this._userfeedservice.getUserFeed(this.searchTag).subscribe((data: any) => {
      this.userFeed = data;
      this.isloadedData = true;
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
