import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerService } from '../customer.service';
import { UUID } from 'angular2-uuid';



import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';


// ngsw:1:data:dynamic:pwa-offline:cache

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private router: Router, private _customerService: CustomerService, private http: HttpClient) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.sendRequest(req, next);
    }


    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {


        if (req.method === 'POST' && !navigator.onLine) {

            caches.match(req.url).then((response) => {

                if (response) {

                    response.json().then((json) => {

                        const newData = Array.from(json);

                        req.body._id = UUID.UUID();
                        req.body.isOffline = true;

                        newData.push(req.body);

                        const jsonResponse = new Response(JSON.stringify(newData), {
                            headers: {
                                'content-type': 'application/json'
                            }
                        });
                        caches.open('ngsw:1:data:dynamic:pwa-offline:cache').then(cache => {
                            cache.put(req.url, jsonResponse);
                        });
                    });
                }
            });

            localStorage.setItem(req.body.email, JSON.stringify(req.body));
            this.router.navigateByUrl('/');


        } else {
            console.log('Coo', req);
            return next.handle(req);
        }
    }
}
