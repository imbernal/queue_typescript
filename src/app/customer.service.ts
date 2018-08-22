import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CustomerService implements OnInit {

  private apiURL = 'http://localhost:3000/';

  private customers: any;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private _http: HttpClient) {

    if (navigator.onLine && localStorage.length > 0) {
      const calls = [];


      Object.keys(localStorage).forEach(key => {
        calls.push(this._http.post(`${this.apiURL}customers`, JSON.parse(localStorage.getItem(key)), this.httpOptions));
        localStorage.removeItem(key);
      });

      forkJoin(calls).subscribe();

      localStorage.clear();


    }
  }

  ngOnInit() {
    console.log('UpdateCustomerCons', this.customers);
  }

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

  getCustomerById(customerId) {

    if (!navigator.onLine) {
      this.getCustomerCache(customerId);
    } else {

      return this._http
        .get(
          `${this.apiURL}/customer/${customerId}`,
          this.httpOptions
        )
        .pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
    }

  }


  getCustomerCache(customerId) {
    let customer: any;
    caches.match('http://localhost:3000/customers').then((response) => {

      if (response) {

        response.json().then((json) => {
          customer = json.filter(item => item._id === customerId);
          console.log('Cusotmer', customer);
        });
      }
    });

    // return customer;
  }

  private handleError(error: HttpErrorResponse) {
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
