import { Component, effect, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { TeaseWhishlist } from './tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWhishlist, SummarizeOrder, MatButton],
  template: `
    <div class="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 sm:py-0">
      <app-back-button class="mb-6 mt-4" navigateTo="/products/all"
        >Continue Shopping</app-back-button
      >
      <h1 class="mb-4 text-2xl font-extrabold sm:text-3xl">Shopping Cart</h1>
      <app-tease-whishlist class="mb-6 block"></app-tease-whishlist>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items></app-list-cart-items>
        </div>
        <div class="">
          <app-summarize-order>
            <ng-container actionButton>
              <button matButton="filled" class="mt-6 w-full py-3 primary" (click)="store.processToCheckout()">Proceed to Checkout</button>
            </ng-container>
          </app-summarize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ViewCart {

  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      this.store.cartCount();
      this.store.setCartSeoTags();
    });
  }

}
