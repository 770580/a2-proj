import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];
  constructor(private cartService: ShoppingCartService) { 
    this.products = this.cartService.getProducts();
  }

  ngOnInit() {
  }

}
