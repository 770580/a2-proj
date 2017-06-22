import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
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
  page: number;
  total: number;
  private changeLangSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private translate: TranslateService,
    private router: Router
  ) {

    const pageFromUrl = Number(this.router.parseUrl(router.url).queryParams.page);
    const pageFromLS = Number(localStorage.getItem('page'));
    this.page = pageFromUrl || pageFromLS || 1;
    this.router.navigate(['/products'], { queryParams: { page: this.page } });

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
    const params = {
      lang,
      offset: (this.page - 1) * this.count,
      count: this.count
    };
    this.productsService.getProducts(params)
      .subscribe(
        data => {
          this.products = data.products;
          this.total = data.total;
          this.pending = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.pending = false;
        }
      );
  }

  onPageChanged(event) {
    if (this.page !== event.page) {
      this.page = event.page;
    } else {
      return;
    }
    this.router.navigate(['/products'], { queryParams: { page: this.page } });
    localStorage.setItem('page', this.page.toString());

    this.getProducts(this.translate.currentLang);
  }
}
