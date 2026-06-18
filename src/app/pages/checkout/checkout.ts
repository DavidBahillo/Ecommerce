import { Component, effect, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentForm } from './payment-form/payment-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../ecommerce-store';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SummarizeOrder, MatAnchor],
  template: `
    <div class="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 sm:py-6">
      <app-back-button navigateTo="/cart">Back to Cart</app-back-button>
      <h1 class="mb-4 text-2xl font-extrabold sm:text-3xl">Checkout</h1>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
          <app-shipping-form></app-shipping-form>
          <app-payment-form></app-payment-form>
        </div>
        <div class="lg:col-span-2">
          <app-summarize-order>
            <ng-container checkoutItem>
              @for (item of store.cartItems(); track item.product.id) {
                <div class="flex items-start justify-between gap-3 text-sm sm:text-base">
                  <span class="min-w-0 flex-1 break-words">{{ item.product.name }} x {{ item.quantity }}</span>
                  <span class="shrink-0">\${{ (item.product.price * item.quantity).toFixed(0) }}</span>
                </div>
              }
            </ng-container>
            <ng-container actionButton>
              <button
                matButton="filled"
                class="w-full mt-6 py-3"
                [disabled]="store.loading()"
                (click)="store.placeOrder()"
              >
                {{ store.loading() ? 'Processing...' : 'Place Order' }}
              </button>
            </ng-container>
          </app-summarize-order>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      this.store.cartCount();
      this.store.setCheckoutSeoTags();
    });
  }
}
