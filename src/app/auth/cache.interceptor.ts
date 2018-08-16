import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';



import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // if (req.method === 'POST') {
        //     localStorage[req.body.email] = JSON.stringify(req);
        // }

        // let db = indexedDB.open('customers', 1);

        // Object.keys(localStorage).forEach(function (key) {
        //     console.log(JSON.parse(localStorage.getItem(key)));
        // });
        // navigator.serviceWorker.

        return this.sendRequest(req, next);
    }


    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.method === 'POST' && navigator.onLine) {

            localStorage[req.body.email] = JSON.stringify(req);
            this.router.navigateByUrl('list');

            return;
        } else {
            localStorage.clear();
            return next.handle(req);
        }
    }
}
