import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ProductRequestParams } from '../_models/products-request-params.model';

@Injectable()
export class ProductsService {
  constructor(private http: Http) { }

  getProducts(params: ProductRequestParams): Observable<any> {
    const { lang, idList, localize, offset, count } = params;
    let productsUrl = `api/products?lang=${lang}`;
    if (idList && idList.length) {
      productsUrl += `&idList=${idList.join()}`;
    }
    if (localize) {
      productsUrl += '&localize';
    }
    if (offset >= 0 && count) {
      productsUrl += `&offset=${offset}&count=${count}`;
    }

    return this.http.get(productsUrl)
      .map((res: Response) => res.json() || {})
      .catch((error: Response) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }
}
