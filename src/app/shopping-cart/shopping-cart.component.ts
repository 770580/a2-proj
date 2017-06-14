import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct } from '../cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: CartProduct[];
  totalPrice: Number;

  constructor(private cartService: ShoppingCartService, private popupService: PopupService) { 
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
  }

  makeOrder() {
    this.popupService.doShow({
      type: 'warning',
      text: 'This functionality is not implemented...'
    });
  }

  onQuantityChanged() {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
