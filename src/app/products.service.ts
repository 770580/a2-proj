import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private productsUrl = 'api/products';

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.productsUrl)
      .map((res: Response) => res.json().products || [])
      .catch((error: Response) => 
        Observable.throw(error.json().error || 'Server error')
      );
  }
}
