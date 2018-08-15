import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class RequestQueue<T> {

    _items: T[] = [];

    push(val: T) {
        this._items.push(val);
    }

    pop(): T | undefined {
        return this._items.shift();
    }

}
