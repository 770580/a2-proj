import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const APP_ROUTES: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'products', 
    component: ProductsComponent
  },
  {
    path: 'about', 
    component: AboutComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];