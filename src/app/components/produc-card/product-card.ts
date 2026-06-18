import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from '@angular/router';
import { StockStatus } from '../../pages/view-product-detail/stock-status/stock-status';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton, RouterLink, StockStatus, StarRating],
  template: `
    <div
      class=" relative bg-white cursor-pointer rounded-xl shadow-md overflow-hidden
      flex flex-col h-full transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        [src]="product().imageUrl"
        class="w-full h-48 sm:h-60 md:h-[300px] object-cover rounded-t-xl"
        alt="{{ product().name }}"
        [routerLink]="['/product', product().id]"
        [style.viewTransitionName]="'product-image-' + product().id"
      />
      <ng-content></ng-content>
      <div class="p-3 sm:p-5 flex-1 flex flex-col" [routerLink]="['/product', product().id]">
        <h3 class="text-base sm:text-lg font-semibold mb-2 text-gray-900 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-gray-600 text-sm mb-3 flex-1 leading-relaxed">
          {{ product().description }}
        </p>
       <app-star-rating class="mb-2" [rating]="product().rating">
        ({{product().reviewsCount}})
       </app-star-rating>
        <div class="text-sm font-medium mb-3">
          <app-stock-status [inStock]="product().inStock"></app-stock-status>
        </div>
        <div class="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span class="text-xl sm:text-2xl font-bold text-gray-900">\${{ product().price }}</span>
          <button
            matButton="filled"
            color="primary"
            class="w-full justify-center whitespace-nowrap text-sm sm:w-auto sm:shrink-0"
            [disabled]="!product().inStock"
            (click)="$event.stopPropagation(); store.addToCart(product())"
          >
            <mat-icon>shopping_cart</mat-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 360px;
      justify-self: center;
    }
  `,
})
export class ProductCard {
  product = input.required<Product>();

  store = inject(EcommerceStore);
}
