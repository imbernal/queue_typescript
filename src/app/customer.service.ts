import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class CustomerService {

  private apiURL = 'http://localhost:3000/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private _http: HttpClient) { }

  getAllCustomers(): Observable<any> {
    return this._http.get(`${this.apiURL}customers`, this.httpOptions)
      .pipe(
        map(this.extractData),
      // catchError(this.handleError)
    );
  }

  saveCustomer(customerData): Observable<any> {
    return this._http
      .post(
        `${this.apiURL}customers`,
        customerData,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    console.log('asa', error);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened!!!');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }



}
