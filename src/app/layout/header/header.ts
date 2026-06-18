import { Component } from '@angular/core';
import { HeaderActions } from './../header-actions/header-actions';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActions, RouterLink],
  template: `
    <mat-toolbar class="sticky top-0 z-[10] w-full py-2 elevated">
      <div
        class="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-3 sm:px-0"
      >
        <span routerLink="/" class="cursor-pointer shrink-0 text-sm font-semibold sm:text-lg"
          >The Big Store</span
        >
        <!-- <img src="logo.png" routerLink="/" alt="The Big Store Logo" class="h-18 w-auto cursor-pointer shrink-0" /> -->
        <app-header-actions/>
      </div>

  </mat-toolbar>
  `,
  styles: ``,
})
export class Header {

}
