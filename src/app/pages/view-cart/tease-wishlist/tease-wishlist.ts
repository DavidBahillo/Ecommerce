import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tease-whishlist',
  imports: [ViewPanel, MatButton, MatIcon, RouterLink],
  template: `
    <div appViewPanel class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-3 sm:items-center">
        <mat-icon class="!text-red-500 shrink-0">favorite_border</mat-icon>
        <div class="min-w-0">
          <h2 class="text-lg font-bold break-words sm:text-xl">Wishlist ({{ store.wishlistCount() }})</h2>
          <p class="text-sm text-gray-500">
            You have {{ store.wishlistCount() }} items saved for later.
          </p>
        </div>
      </div>
      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <button
          matButton
          routerLink="/wishlist"
          class="w-full text-sm font-medium text-blue-600 hover:underline sm:w-auto"
        >
          View All
        </button>
        <button
          matButton="filled"
          class="flex w-full items-center justify-center gap-2 sm:w-auto"
          (click)="store.addWishlistToCart()"
        >
          <mat-icon>shopping_cart</mat-icon>
          Add All to the cart
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeaseWhishlist {
  store = inject(EcommerceStore);
}
