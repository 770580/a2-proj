import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct } from '../cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: CartProduct[];
  totalPrice: Number;

  @ViewChild(PopupComponent) popupComponent: PopupComponent;
  constructor(private cartService: ShoppingCartService) { 
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
  }

  makeOrder() {
    this.popupComponent.doShow({
      type: 'warning',
      text: 'This functionality is not implemented...'
    });
  }
}
