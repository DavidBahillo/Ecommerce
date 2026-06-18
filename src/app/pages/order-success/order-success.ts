import { CurrencyPipe, DatePipe, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { BackButton } from '../../components/back-button/back-button';
import { ViewPanel } from '../../directives/view-panel';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-success',
  imports: [BackButton, ViewPanel, RouterLink, MatButton, MatIcon, CurrencyPipe, DatePipe, NgIf, NgFor],
  template: `
    <div class="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 sm:py-6">
      <app-back-button navigateTo="/products/all">Continue Shopping</app-back-button>

      <div appViewPanel class="mt-4">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p class="text-sm text-gray-500">Order completed</p>
            <h1 class="mt-1 text-2xl font-extrabold sm:text-3xl">Thanks for your purchase!</h1>
            <p class="text-gray-600 mt-2" *ngIf="order(); else noOrderState">
              Your payment was successful and your order is now being processed.
            </p>
          </div>

          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <mat-icon>check</mat-icon>
          </div>
        </div>

        <ng-template #noOrderState>
          <p class="text-gray-600 mt-2">
            We could not find your latest order details, but your checkout may still be completed.
          </p>
        </ng-template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6" *ngIf="order() as orderData">
          <div class="rounded-lg border border-gray-200 p-4">
            <p class="text-sm text-gray-500">Order ID</p>
            <p class="font-semibold break-all">{{ orderData.id }}</p>
          </div>
          <div class="rounded-lg border border-gray-200 p-4">
            <p class="text-sm text-gray-500">Placed on</p>
            <p class="font-semibold">{{ placedAt() | date: 'medium' }}</p>
          </div>
          <div class="rounded-lg border border-gray-200 p-4">
            <p class="text-sm text-gray-500">Total paid</p>
            <p class="font-semibold">{{ orderData.total | currency }}</p>
          </div>
        </div>

        <div class="mt-6" *ngIf="order() as orderData">
          <h2 class="text-xl font-bold mb-3">Items ({{ itemCount() }})</h2>
          <div class="space-y-3">
            <div
              *ngFor="let item of orderData.items"
              class="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="min-w-0">
                <p class="font-semibold break-words">{{ item.product.name }}</p>
                <p class="text-sm text-gray-500">
                  Qty: {{ item.quantity }} x {{ item.product.price | currency }}
                </p>
              </div>
              <p class="font-semibold sm:text-right">{{ item.product.price * item.quantity | currency }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <a matButton="filled" routerLink="/products/all">Keep Shopping</a>
          <a matButton="outlined" routerLink="/cart">Go to Cart</a>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly order = signal<Order | null>(this.resolveOrder());
  readonly placedAt = signal(new Date());
  readonly itemCount = computed(() =>
    this.order()?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
  );

  private resolveOrder(): Order | null {
    const fromCurrentNavigation = this.router.getCurrentNavigation()?.extras?.state?.['order'];
    const fromHistoryState = isPlatformBrowser(this.platformId) ? history.state?.['order'] : null;
    return (fromCurrentNavigation ?? fromHistoryState ?? null) as Order | null;
  }
}
