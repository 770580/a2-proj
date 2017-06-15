import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartService } from './_services/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './_services/popup.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    ProductComponent,
    ShoppingCartComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    AlertModule.forRoot()
  ],
  providers: [
    ShoppingCartService,
    PopupService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
