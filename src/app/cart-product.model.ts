import { Product } from './product.model';

export class CartProduct {
  product: Product;
  quanitity: number;

  constructor(product: Product, quanitity: number = 1) {
    this.product = product;
    this.quanitity = quanitity;
  }
}
