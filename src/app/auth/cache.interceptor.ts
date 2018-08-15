import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { RequestCacheService } from '../requestCache.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// import 'rxjs/add/operator/do';

import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';

const TTL = 10;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse = this.cache.get(req.url);
        if (cachedResponse) {
            return Observable.of(cachedResponse);
        } else {
            return this.sendRequest(req, next);
        }

    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req.url, event, null);
                }
            }, error => {
                console.error('NICE ERROR', error);
            })
        );
    }
}
