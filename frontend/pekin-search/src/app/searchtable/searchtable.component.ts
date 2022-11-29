import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import data from '../../assets/response.json';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.css'],
})
export class SearchtableComponent {
  spinnerStyle = Spinkit;
  isLoading = true;
  typeSelected: string;
  constructor(private spinner: NgxSpinnerService) {
    console.log(data);
    if (data) {
      this.isLoading = false;
    }
  }

  search() {
    this.isLoading = true;
  }

  ngOnInit() {
    /** spinner starts on init */
  }
}
