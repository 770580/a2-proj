import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: CartProduct[];
  totalPrice: Number;

  constructor(private cartService: ShoppingCartService) { 
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
  }

}
