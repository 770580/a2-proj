import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';
import { ProductsService } from '../_services/products.service';

@Injectable()
export class ShoppingCartService {
  cartProducts: CartProduct[] = [];
  totalPrice: Number;
  pending: boolean = false;
  private totalQuantity = 0;
  private totalQuantitySource = new Subject<number>();
  changeTotalQuantity$ = this.totalQuantitySource.asObservable();
  private changeLangSubscription: Subscription;

  constructor(private translate: TranslateService, private productsService: ProductsService) {
    this.restoreDataFromLocalStorage();
    setTimeout(() => (
      this.changeLangSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.renewProducts(event.lang);
      })
    ), 0);
  }

  private setTotalPrice() {
    this.totalPrice = this.cartProducts.reduce((total, cartProduct) => {
      return (total + cartProduct.product.price * cartProduct.quantity);
    }, 0);
  }

  private setTotalQuantity() {
    this.totalQuantity = this.cartProducts.reduce((total, cartProduct) => {
      return (total + cartProduct.quantity);
    }, 0);
  }

  private processCartChanges() {
    this.setTotalPrice();
    this.setTotalQuantity();
    this.totalQuantitySource.next(this.totalQuantity);
    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    const data: Array<any> = this.cartProducts.map(cartProduct => {
      const { product, quantity } = cartProduct;
      return { product, quantity };
    });
    localStorage.setItem('cart', JSON.stringify(data));
  }

  private restoreDataFromLocalStorage() {
    const restoredData = JSON.parse(localStorage.getItem('cart'));
    if (restoredData) {
      restoredData.forEach(data => (
        this.addNewCartProduct(data.product, data.quantity)
      ));
    }
  }

  private addNewCartProduct(product: Product, quantity: number) {
    const newProduct: CartProduct = new CartProduct(product, quantity);
    this.cartProducts.push(newProduct);
    newProduct.quantitySubscription = newProduct.quantity$.subscribe(() => this.processCartChanges());
  }

  private renewProducts(lang: string) {
    this.pending = true;
    const idList: Array<number> = this.cartProducts.map(cP => cP.product.id);
    const params = {
      lang,
      idList,
      localize: true
    };
    this.productsService.getProducts(params).subscribe(
      data => {
        this.cartProducts.forEach(cP => {
          const product = data.products.find(product => cP.product.id === product.id);
          if (!product) { return; }
          cP.product.name = product.name;
          cP.product.description = product.description;
        });
        this.saveDataToLocalStorage();
        this.pending = false;
      },
      error => {
        this.pending = false;
      }
    );
  }

  addProduct(product: Product) {
    const existingProduct: CartProduct = this.cartProducts.find( item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.addNewCartProduct(product, 1);
    }
  }

  getProducts() {
    return this.cartProducts;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getTotalQuantity() {
    return this.totalQuantity;
  }

  removeCartProduct(cartProduct: CartProduct) {
    cartProduct.quantitySubscription.unsubscribe();
    const removeProductIndex: number = this.cartProducts.findIndex(cP => cP === cartProduct);
    this.cartProducts.splice(removeProductIndex, 1);
    this.processCartChanges();
  }
}
