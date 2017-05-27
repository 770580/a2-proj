import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class ShoppingCartService {
  products: Product[] = [];

  constructor() { }

  addProduct(product: any) {
    this.products.push(product);
  }
}
