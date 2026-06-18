import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { QtySelector } from '../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/products';
import { StockStatus } from './stock-status/stock-status';
import { StarRating } from '../../components/star-rating/star-rating';

@Component({
  selector: 'app-product-info',
  imports: [MatButton, MatIcon, CurrencyPipe, QtySelector, StockStatus, StarRating],
  template: `
    <div class="flex flex-col">
      <p class="text-sm uppercase tracking-wide text-gray-500">{{ product().category }}</p>
      <h1 class="mt-2 text-2xl font-extrabold sm:text-3xl">{{ product().name }}</h1>
      <app-star-rating class="mb-3" [rating]="product().rating">
        {{product().rating}} ({{product().reviewsCount}})
       </app-star-rating>
      <p class="mt-4 text-sm font-medium uppercase tracking-wide text-gray-500">Description</p>
      <p class="mt-2 text-gray-600 leading-relaxed">{{ product().description }}</p>

      <div class="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <span class="text-3xl font-bold">{{ product().price | currency }}</span>
        <app-stock-status [inStock]="product().inStock"></app-stock-status>
      </div>

      <div class="mt-6">
        <p class="text-sm font-medium text-gray-600 mb-2">Quantity</p>
        <app-qty-selector
          [quantity]="quantity()"
          (qtyUpdate)="quantity.set($event)"
        ></app-qty-selector>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          matButton="filled"
          class="w-full justify-center sm:w-auto"
          [disabled]="!product().inStock"
          (click)="addToCart()"
        >
          <mat-icon>shopping_cart</mat-icon>
          Add to cart
        </button>
        <button
          matButton="outlined"
          class="w-full justify-center sm:w-auto"
          [class]="isInWishlist() ? 'danger' : ''"
          (click)="toggleWishlist()"
        >
          <mat-icon>{{ isInWishlist() ? 'favorite' : 'favorite_border' }}</mat-icon>
          {{ isInWishlist() ? 'Quitar de la wishlist' : 'Add to wishlist' }}
        </button>
      </div>
      <div class="pt-6 flex flex-col gap-2 text-xs text-gray-700">
        <div class="flex items-start gap-3">
          <mat-icon class="small">local_shipping</mat-icon>
          <span>Free shipping on orders over $50</span>
        </div>
        <div class="flex items-start gap-3">
          <mat-icon class="small">autorenew</mat-icon>
          <span>30-day return policy</span>
        </div>
        <div class="flex items-start gap-3">
          <mat-icon class="small">shield</mat-icon>
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  product = input.required<Product>();
  store = inject(EcommerceStore);
  quantity = signal(1);

  isInWishlist = computed(() =>
    this.store.whistlistItem().some((item) => item.id === this.product().id),
  );

  constructor() {
    effect(() => {
      this.product().id;
      this.quantity.set(1);
    });
  }

  addToCart() {
    this.store.addToCart(this.product(), this.quantity());
  }

  toggleWishlist() {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(this.product());
      return;
    }

    this.store.addTowhishlist(this.product());
  }
}
