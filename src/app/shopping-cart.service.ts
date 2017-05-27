import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { CartProduct } from './cart-product.model';

@Injectable()
export class ShoppingCartService {
  products: CartProduct[] = [];

  constructor() { }

  addProduct(product: Product) {
    let existingProduct: CartProduct = this.products.find( item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quanitity += 1;
    } else {
      let newProduct: CartProduct = new CartProduct(product);
      this.products.push(newProduct);
    }
  }

  getProducts() {
    return this.products;
  }
}
