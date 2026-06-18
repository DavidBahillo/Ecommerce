import { Component, effect, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/produc-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, MatAnchor, RouterLink],
  template: `
    <div class="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
      <app-back-button class="mb-6" label="Continue Shopping" navigateTo="/products/all">
        Continue Shopping</app-back-button
      >

      @if (store.wishlistCount() > 0) {
        <div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-2xl font-bold">My Wishlist</h2>
          <span class="block text-gray-600"
            >You have {{ store.wishlistCount() }} items in your wishlist.</span
          >
        </div>
        <div class="responsive-grid">
          @for (product of store.whistlistItem(); track product.id) {
            <app-product-card
              [product]="product"
              (toggleWishlist)="store.removeFromWishlist(product)"
            >
              <button
                class=" !absolute top-3 right-3 z-10 !bg-white border-0 shadow-md flex items-center justify-center
                cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
                matIconButton
                (click)="store.removeFromWishlist(product)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </app-product-card>
          }
        </div>
        <div class="mt-8 flex justify-center">
          <button
            matButton="outlined"
            class="danger cursor-pointer"
            (click)="store.clearWishlist()"
          >
            Clear Wishlist
          </button>
        </div>
      } @else {
        <div class="py-16 text-center sm:py-20">
          <mat-icon class="text-gray-300 mb-4" >favorite</mat-icon>
          <h2 class="mb-4 text-xl font-bold sm:text-2xl">Your wishlist is empty</h2>
          <p class="text-gray-600 mb-6">Browse products and add them to your wishlist.</p>
          <a matButton routerLink="/products/all">Start Shopping</a>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      this.store.wishlistCount();
      this.store.setWishlistSeoTags();
    });
  }
}
