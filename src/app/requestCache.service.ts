import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class RequestQueue {

    _items: any = [];

    push(val: any) {
        this._items.push(val);
    }

    pop(): any | undefined {
        return this._items.shift();
    }

}
