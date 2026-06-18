import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductInfo } from './product-info';
import { ViewReviews } from './view-reviews/view-reviews';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, MatButton, MatIcon, RouterLink, ProductInfo, ViewReviews],
  template: `
    <div class="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
      <app-back-button matButton="filled" class="mb-6" [navigateTo]="backRoute()"
        >Continue Shopping</app-back-button
      >

      @if (store.selectedProduct(); as product) {
        <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <img
              [src]="product.imageUrl"
              [alt]="product.name"
              class="h-72 w-full object-cover sm:h-96 lg:h-[500px]"
              [style.viewTransitionName]="'product-image-' + product.id"
            />
          </div>

          <app-product-info [product]="product"></app-product-info>
        </div>
        <app-view-reviews  [product]="product"></app-view-reviews>
      } @else {
        <div class="rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
          <mat-icon class="!text-5xl !w-12 !h-12 text-gray-400">search_off</mat-icon>
          <h2 class="mt-4 text-xl font-bold sm:text-2xl">Product not found</h2>
          <p class="mt-2 text-gray-600">The product might not exist or the link is incorrect.</p>
          <a class="mt-6 inline-block" matButton="filled" routerLink="/products/all"
            >Back to products</a
          >
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<string>();

  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      const productId = this.productId();

      this.store.setProductId(productId);
      this.store.setSelectedProductSeoTags(productId);
    });
  }
  backRoute = computed(() => `/products/${this.store.category()}`);
}
