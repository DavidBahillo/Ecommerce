import { Component } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatFormField, MatInput],
  template: `
    <div appViewPanel>
      <h2 class="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl">
        <mat-icon>local_shipping</mat-icon>
        Shipping Information
      </h2>
      <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-form-field appearance="outline">
          <input matInput type="text" placeholder="First Name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input matInput type="text" placeholder="Last Name" />
        </mat-form-field>
        <mat-form-field class="lg:col-span-2" appearance="outline">
          <textarea matInput placeholder="Address"></textarea>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input matInput type="text" placeholder="City" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input matInput type="text" placeholder="State" />
        </mat-form-field>
        <mat-form-field class="lg:col-span-2" appearance="outline">
          <input matInput type="text" placeholder="Zip Code" />
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {}
