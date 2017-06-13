import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Product } from './product.model';

export class CartProduct {
  product: Product;
  set quanitity(value: number) {
    value = Number(value);
    this.quantitySource.next(value);
  }

  get quanitity():number {
    return this.quantitySource.getValue();
  }

  private quantitySource = new BehaviorSubject<number>(0);
  quantity$ = this.quantitySource.asObservable();

  constructor(product: Product) {
    this.product = product;
  }
}
