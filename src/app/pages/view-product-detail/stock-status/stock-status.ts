import { Component, input } from '@angular/core';
import { Product } from '../../../models/products';

@Component({
  selector: 'app-stock-status',
  imports: [],
  template: `
    @if (inStock()) {
      <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
        In Stock
      </span>
    } @else {
      <span class="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
        Out of Stock
      </span>
    }
  `,
  styles: ``,
})
export class StockStatus {
  inStock = input(false);
  }
