import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { CartProduct } from './cart-product.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingCartService {
  cartProducts: CartProduct[] = [];
  totalPrice: Number;
  private totalQuantity: number = 0;
  private totalQuantitySource = new Subject<number>();
  changeTotalQuantity$ = this.totalQuantitySource.asObservable();

  constructor() { }

  addProduct(product: Product) {
    let existingProduct: CartProduct = this.cartProducts.find( item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quanitity += 1;
    } else {
      let newProduct: CartProduct = new CartProduct(product);
      this.cartProducts.push(newProduct);
    }

    this.setTotalPrice();
    this.totalQuantity += 1;
    this.totalQuantitySource.next(this.totalQuantity);
  }

  getProducts() {
    return this.cartProducts;
  }

  private setTotalPrice() {
    this.totalPrice = this.cartProducts.reduce((total, cartProduct) => {
      return (total + cartProduct.product.price * cartProduct.quanitity)
    }, 0);
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
