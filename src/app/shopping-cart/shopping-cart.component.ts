import { Component, ViewChild, ElementRef } from '@angular/core';
import { CartProduct } from '../cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartProducts: CartProduct[];
  totalPrice: Number;

  constructor(private cartService: ShoppingCartService, private popupService: PopupService, private elementRef: ElementRef) { 
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  makeOrder() {
    this.popupService.doShow({
      type: 'warning',
      text: 'This functionality is not implemented...'
    });
  }

  onQuantityChanged(cartProduct: CartProduct) {
    this.totalPrice = this.cartService.getTotalPrice();
    this.elementRef.nativeElement.querySelector('#quantity' + cartProduct.product.id).value = cartProduct.quantity;
  }
}
