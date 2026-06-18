import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { StarRating } from "../../../components/star-rating/star-rating";
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'app-view-review-item',
  imports: [StarRating, DatePipe, ViewPanel],
  template: `
    <div appViewPanel>
  <div class="flex items-start gap-3 sm:gap-4">
    <img
      [src]="review().userImageUrl"
      [alt]="review().userName"
      class="h-10 w-10 shrink-0 rounded-full"
    />
    <div class="min-w-0">
  <div class="text-base font-semibold sm:text-lg">{{ review().userName }}</div>
  <div class="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
    <app-star-rating [rating]="review().rating" />
    <div class="text-sm text-gray-500">{{ review().reviewDate | date: 'd MMM, yyyy' }}</div>
  </div>
  <div class="mb-1 text-base font-semibold break-words">{{ review().title }}</div>
  <div class="text-sm text-gray-500">{{ review().comment }}</div>
</div>
  </div>
</div>
  `,
  styles: ``,
})
export class ViewReviewItem {
review = input.required<UserReview>();
}
