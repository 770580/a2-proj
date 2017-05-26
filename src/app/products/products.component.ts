import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  errorMessage: string;
  products: Product[];
  pending: Boolean = false;
  mode = 'Observable';

  constructor(private productsService: ProductsService) {
    this.getProducts();
  }

  ngOnInit() {
  }

  getProducts() {
    this.pending = true;
    this.productsService.getProducts()
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
