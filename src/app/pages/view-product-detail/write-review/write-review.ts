import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { EcommerceStore } from '../../../ecommerce-store';
import { ViewPanel } from '../../../directives/view-panel';
import { Toaster } from '../../../services/toaster';
import { OptionItem } from '../../../models/option-item';

@Component({
  selector: 'app-write-review',
  imports: [
    ReactiveFormsModule,
    ViewPanel,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
  ],
  template: `
    <div appViewPanel>
      <h2 class="mb-6 text-lg font-semibold sm:text-xl">Write a Review</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()" class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Review Title</mat-label>
            <input
              formControlName="title"
              placeholder="Summarize your review"
              matInput
              type="text"
            />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Rating</mat-label>
            <mat-select formControlName="rating">
              @for (option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">{{ option.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        <mat-form-field class="w-full" appearance="outline">
          <mat-label>Comment</mat-label>
          <textarea
            matInput
            rows="5"
            formControlName="comment"
            placeholder="Share details about your experience with this product"
          ></textarea>
        </mat-form-field>

        <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button type="button" matButton="outlined" class="w-full sm:w-auto" (click)="cancelReview()">Cancel</button>
          <button type="submit" matButton="filled" class="w-full sm:w-auto">Submit Review</button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class WriteReview {
  private fb = inject(NonNullableFormBuilder);
  private store = inject(EcommerceStore);
  private toaster = inject(Toaster);

  ratingOptions = signal<OptionItem[]>([
    { label: '5 stars - Excellent', value: 5 },
    { label: '4 stars - Good', value: 4 },
    { label: '3 stars - Average', value: 3 },
    { label: '2 stars - Poor', value: 2 },
    { label: '1 star - Terrible', value: 1 },
  ]);

  reviewForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    comment: ['', [Validators.required, Validators.minLength(10)]],
    rating: [5, [Validators.required]],
  });

  saveReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      this.toaster.error('Please complete all required fields');
      return;
    }

    const reviewData = this.reviewForm.getRawValue();
    const saved = this.store.addReviewToSelectedProduct(reviewData);
    if (!saved) {
      return;
    }

    this.toaster.success('Review submitted successfully');
    this.reviewForm.reset({ title: '', comment: '', rating: 5 });
  }

  cancelReview() {
    this.reviewForm.reset({ title: '', comment: '', rating: 5 });
    this.store.hideWriteReview();
  }
}
