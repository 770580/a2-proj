import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  totalQuantity: number;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, private translate: TranslateService) {
    this.totalQuantity = shoppingCartService.getTotalQuantity();
    this.subscription = shoppingCartService.changeTotalQuantity$
      .subscribe(totalQuantity => this.totalQuantity = totalQuantity);
  }

  setLanguage(lang: string) {
    if (lang !== this.translate.currentLang) {
      this.translate.use(lang);
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
