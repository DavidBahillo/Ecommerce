import { BreakpointObserver } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs';

import { ProductCard } from '../../components/produc-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWhishlistButton } from '../../components/toggle-whishlist-button/toggle-whishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    TitleCasePipe,
    RouterLink,
    MatIcon,
    MatIconButton,
    ToggleWhishlistButton,
  ],
  template: `
    <mat-sidenav-container class="min-h-[calc(100vh-88px)] bg-gray-100">
      <mat-sidenav
        [mode]="isMobile() ? 'over' : 'side'"
        [opened]="!isMobile() || drawerOpen()"
        (openedChange)="drawerOpen.set($event)"
        class="w-[85vw] max-w-64 bg-white px-4 py-5 sm:p-6"
      >
        <div class="mb-4">
          <h2 class="text-lg text-gray-900 font-semibold mb-2">Categories</h2>
          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item
                class="my-2"
                [activated]="cat === category()"
                [routerLink]="['/products', cat]"
                (click)="onCategorySelect()"
              >
                <span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? '!text-white' : null"
                  >{{ cat | titlecase }}</span
                >
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 px-3 py-4 sm:p-6 h-full">
        <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          @if (isMobile()) {
            <button
              matIconButton
              class="bg-white elevated shrink-0 self-start"
              aria-label="Open categories"
              (click)="toggleCategories()"
            >
              <mat-icon>menu</mat-icon>
            </button>
          }

          <div class="min-w-0">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 break-words">
              {{ category() | titlecase }}
            </h1>
            <p class="text-sm sm:text-base text-gray-700">
              {{ store.filteredProducts().length }} products found.
            </p>
          </div>
        </div>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product">
              <app-toggle-whishlist-button
                [product]="product"
                class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full"
                [style.viewTransitionName]="'wishlist-button-' + product.id"
              ></app-toggle-whishlist-button>
            </app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  store = inject(EcommerceStore);
  categories = signal<string[]>(['all', 'hardware', 'peripherals', 'apparel', 'collectibles']);
  drawerOpen = signal(false);
  breakpointObserver = inject(BreakpointObserver);
  readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 1023px)').pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  constructor() {
    effect(() => {
      this.drawerOpen.set(!this.isMobile());
    });

    effect(() => {
      const category = this.category();

      this.store.setCategory(category);
      this.store.setProductsListSeoTags(category === 'all' ? undefined : category);
    });
  }

  toggleCategories() {
    this.drawerOpen.update((open) => !open);
  }

  onCategorySelect() {
    if (this.isMobile()) {
      this.drawerOpen.set(false);
    }
  }
}
