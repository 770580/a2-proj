import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../_models/product.model';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }
}
