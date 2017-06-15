import { Component, ViewChild, ElementRef } from '@angular/core';
import { CartProduct } from '../_models/cart-product.model';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartProducts: CartProduct[];

  constructor(private cartService: ShoppingCartService, private popupService: PopupService, private elementRef: ElementRef) { 
    this.cartProducts = this.cartService.getProducts();
  }

  makeOrder() {
    this.popupService.doShow({
      type: 'warning',
      text: 'This functionality is not implemented...'
    });
  }

  onQuantityChanged(cartProduct: CartProduct) {
    this.elementRef.nativeElement.querySelector('#quantity' + cartProduct.product.id).value = cartProduct.quantity;
  }

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeCartProduct(cartProduct);
  }
}
