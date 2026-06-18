import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelector } from '../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatIconButton, RouterLink],
  template: `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,3fr)_auto_auto] sm:items-center sm:gap-6">
      <div class="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
        <img
          [src]="item().product.imageUrl"
          class="h-20 w-20 shrink-0 rounded-lg object-cover cursor-pointer sm:h-24 sm:w-24"
          [routerLink]="['/product', item().product.id]"
          [style.viewTransitionName]="'product-image-' + item().product.id"
          alt="{{ item().product.name }}"
        />
        <div class="min-w-0">
          <div
            class="cursor-pointer text-base font-semibold text-gray-900 break-words sm:text-lg"
            [routerLink]="['/product', item().product.id]"
          >
            {{ item().product.name }}
          </div>
          <div class="text-base text-gray-600 sm:text-lg">\${{ item().product.price }}</div>
        </div>
      </div>
      <div class="justify-self-start sm:justify-self-center">
        <app-qty-selector
          [quantity]="item().quantity"
          (qtyUpdate)="store.setItemQuantity({ productId: item().product.id, quantity: $event })"
        ></app-qty-selector>
      </div>
      <div
        class="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-self-end"
      >
        <div class="text-lg font-semibold sm:text-right">\${{ total() }}</div>
        <div class="flex -me-2 sm:-me-3">
          <button matIconButton (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);
  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
