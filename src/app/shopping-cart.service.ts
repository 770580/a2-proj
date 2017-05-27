import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { CartProduct } from './cart-product.model';

@Injectable()
export class ShoppingCartService {
  products: CartProduct[] = [];

  constructor() { }

  addProduct(product: Product) {
    let newProduct: CartProduct = new CartProduct(product);

    let existingProduct: CartProduct = this.products.find( item => item.product.id === product.id);

    existingProduct
    ? existingProduct.quanitity += 1
    : this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }
}
