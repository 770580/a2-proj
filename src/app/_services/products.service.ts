import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product } from '../_models/product.model';

@Injectable()
export class ProductsService {
  constructor(private http: Http) { }

  getProducts(lang: string, idList?: Array<number>, localize?: boolean): Observable<any> {
    let productsUrl = `api/products?lang=${lang}`;
    if (idList && idList.length) {
      productsUrl += `&idList=${idList.join()}`;
    }
    if (localize) {
      productsUrl += '&localize';
    }

    return this.http.get(productsUrl)
      .map((res: Response) => res.json().products || [])
      .catch((error: Response) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }
}
