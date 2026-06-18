import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatRadioGroup } from "@angular/material/radio";
import { MatRadioButton } from "@angular/material/radio";
import { ViewPanel } from "../../../directives/view-panel";

@Component({
  selector: 'app-payment-form',
  imports: [MatIcon,MatRadioGroup,MatRadioButton,ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="mb-6 flex items-center gap-2 text-xl font-bold sm:text-2xl">
        <mat-icon>payment</mat-icon>
        Payment Options
      </h2>
      <div>
        <mat-radio-group [value]="'stripe'">
          <mat-radio-button value="stripe">
            <img src="stripe-logo.png" alt="Stripe" class="h-6 max-w-full" />
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {}
