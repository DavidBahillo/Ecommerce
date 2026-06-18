import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/products';
import { StarRating } from '../../../components/star-rating/star-rating';

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  template: `
    <div class="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-6">
      <div class="grid gap-6 md:grid-cols-[200px_1fr] md:items-center">
        <div class="flex flex-col items-center md:border-r md:border-gray-200 md:pr-6">
          <div class="mb-1 text-4xl font-bold text-gray-900">{{ product().rating }}</div>
          <div class="mb-2 flex items-center">
          <app-star-rating [rating]="product().rating" />
          </div>
          <div class="text-sm text-gray-500">Based on {{ totalReviews() }} reviews</div>
        </div>

        <div class="space-y-2">
          @for (breakdown of ratingBreakdown(); track breakdown.star) {
            <div class="flex items-center gap-2">
              <span class="w-8 text-sm font-medium text-gray-700">{{ breakdown.star }}★</span>
              <div class="h-2 flex-1 rounded-full bg-gray-200">
                <div
                  class="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                  [style.width.%]="breakdown.percentage"
                ></div>
              </div>
              <span class="w-10 text-right text-sm text-gray-600">{{ breakdown.count }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RatingSummary {
  product = input.required<Product>();
  totalReviews = computed(() => this.product().reviews.length);

  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0) {
      return [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percentage: 0 }));
    }

    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((review) => review.rating === star).length;
      return {
        star,
        count,
        percentage: Math.round((count / total) * 100),
      };
    });
  });
}
