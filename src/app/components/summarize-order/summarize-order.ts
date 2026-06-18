import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';


@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="mb-4 text-xl font-bold sm:text-2xl">Order Summary</h2>
      <div class="space-y-2  pb-4">
        <ng-content select="[checkoutItem]"></ng-content>
      </div>
      <div class="space-y-3 border-t pt-4 text-base sm:text-lg">
        <div class="flex items-start justify-between gap-3">
          <span class="min-w-0 flex-1">Subtotal</span>
          <span class="shrink-0">\${{ subtotal() }}</span>
        </div>
        <div class="flex items-start justify-between gap-3">
          <span class="min-w-0 flex-1">Tax</span>
          <span class="shrink-0">\${{ tax() }}</span>
        </div>
        <div class="flex items-start justify-between gap-3 border-t pt-3 text-lg font-bold">
          <span class="min-w-0 flex-1">Total</span>
          <span class="shrink-0">\${{ total() }}</span>
        </div>
      </div>
      <ng-content select="[actionButton]"></ng-content>
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);
  subtotal = computed(
    () =>
      Math.round(
        this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0) *
          100,
      ) / 100,
  );
  tax = computed(() => Math.round(0.23 * this.subtotal() * 100) / 100);
  total = computed(() => (this.subtotal() + this.tax()).toFixed(2));
}
