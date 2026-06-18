
import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/products';
import { ViewPanel } from '../../../directives/view-panel';
import { RatingSummary } from '../../view-product-detail/rating-summary/rating-summary';
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import {WriteReview} from '../write-review/write-review';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  template: `
    <div appViewPanel>
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-xl font-bold sm:text-2xl">Customer Reviews</h2>
        @if(store.user()) {
          <button matButton="filled" class="w-full sm:w-auto" (click)="store.showWriteReview()">Write a Review</button>
        }
      </div>
      @if(store.writeReview()) {
        <app-write-review class="mb-6"></app-write-review>
      }
      <app-rating-summary [product]="product()"></app-rating-summary>
      <div class="flex flex-col gap-6">
        @for (review of sortedReviews(); track review.id) {
          <app-view-review-item [review]="review"></app-view-review-item>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();
  store = inject(EcommerceStore);

  private toTimestamp(dateValue: Date | string) {
    return new Date(dateValue).getTime();
  }

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort(
      (a, b) => this.toTimestamp(b.reviewDate) - this.toTimestamp(a.reviewDate),
    );
  });
}
