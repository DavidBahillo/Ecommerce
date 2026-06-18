import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center ">
        <button
          matIconButton
          [disabled]="quantity() === 1"
          (click)="updateQuantity(quantity() - 1)"
        >
          <mat-icon>remove</mat-icon>
        </button>
        <input
          type="number"
          min="1"
          class="w-16 rounded border border-gray-300 px-2 py-1 text-center"
          [value]="quantity()"
          (change)="onQuantityChange($any($event.target).value)"
        />
        <button matIconButton (click)="updateQuantity(quantity() + 1)">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class QtySelector {
  quantity = input(0);
  qtyUpdate = output<number>();

  updateQuantity(quantity: number) {
    this.qtyUpdate.emit(Math.max(1, Math.floor(quantity)));
  }

  onQuantityChange(rawValue: string) {
    const parsed = Number(rawValue);

    if (!Number.isFinite(parsed)) {
      return;
    }

    this.updateQuantity(parsed);
  }
}
