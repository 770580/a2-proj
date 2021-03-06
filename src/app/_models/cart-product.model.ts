import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './product.model';

export class CartProduct {
  product: Product;
  quantitySubscription: Subscription;

  set quantity(value: number) {
    value = Number(value);
    if (Number.isInteger(value) && value > 0) {
      if (value >= this.product.quantity) {
        value = this.product.quantity;
      }
    } else {
      value = 0;
    }

    this.quantitySource.next(value);
  }

  get quantity():number {
    return this.quantitySource.getValue();
  }

  private quantitySource = new BehaviorSubject<number>(0);
  quantity$ = this.quantitySource.asObservable();

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.quantity = quantity;
  }
}
