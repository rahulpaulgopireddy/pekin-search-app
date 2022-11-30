import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createUser(usercred: any): Observable<any> {
    return this.http
      .post<any>(
        'http://localhost:8080/user/signup/',
        JSON.stringify(usercred),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  loginUser(usercred: any): Observable<any> {
    return this.http
      .post<any>(
        'http://localhost:8080/user/login',
        JSON.stringify(usercred),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getCurrentUser(id: any): Observable<any> {
    return this.http
      .get<any>('http://localhost:8080/user/me' + id)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getUserFeed(searchstring: any): Observable<any> {
    return this.http
      .get<any>(
        'http://ec2-3-86-218-191.compute-1.amazonaws.com:8080/search/' +
          searchstring
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  // Error handling
  errorHandle(error: { error: { msg: string }; status: any; msg: any }) {
    let errorMessage = '';
    let errorMessageJson = {};
    if (error.error instanceof ErrorEvent) {
      // Get client error
      errorMessage = error.error.msg;
    } else {
      //  server error
      `Error Code: ${error.status}\nMessage: ${error.error.msg}`;
      errorMessageJson = {
        status: error.status,
        message: error.error.msg,
      };
    }
    return throwError(() => {
      return errorMessageJson;
    });
  }
}
