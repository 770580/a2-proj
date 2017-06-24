import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../_services/products.service';

import { Product } from '../_models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  errorMessage: string;
  products: Product[];
  pending: Boolean = false;
  mode = 'Observable';
  count = 10;
  page: number;
  total: number;
  private changeLangSubscription: Subscription;
  private pageSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const pageFromLS = Number(localStorage.getItem('page'));
    if (pageFromLS) {
      this.router.navigate(['/products'], { queryParams: { page: pageFromLS } });
    }

    setTimeout(() => (
      this.changeLangSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.getProducts(event.lang);
      })
    ), 0);
  }

  ngOnInit() {
    this.pageSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = Number(params['page']) || 1;
        localStorage.setItem('page', this.page.toString());
        this.getProducts(this.translate.currentLang);
      });
  }

  ngOnDestroy() {
    this.changeLangSubscription.unsubscribe();
    this.pageSubscription.unsubscribe();
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
    if (event.page !== this.page) {
      this.router.navigate(['/products'], { queryParams: { page: event.page } });
    }
  }
}
