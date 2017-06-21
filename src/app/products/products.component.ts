import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProductsService } from '../_services/products.service';

import { Product } from '../_models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  errorMessage: string;
  products: Product[];
  pending: Boolean = false;
  mode = 'Observable';
  count = 10;
  page = 1;
  total: number;
  private changeLangSubscription: Subscription;

  constructor(private productsService: ProductsService, private translate: TranslateService) {
    setTimeout(() => (
      this.changeLangSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.getProducts(event.lang);
      })
    ), 0);
    this.getProducts(this.translate.currentLang);
  }

  ngOnDestroy() {
    this.changeLangSubscription.unsubscribe();
  }

  getProducts(lang: string) {
    this.pending = true;
    this.productsService.getProducts(lang)
      .subscribe(
        products => {
          this.products = products;
          this.pending = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.pending = false;
        }
      );
  }
}
