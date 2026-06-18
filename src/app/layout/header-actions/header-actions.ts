import { User } from './../../models/user';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatBadge,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
  ],
  template: `
    <div class="flex w-full min-w-0 items-center justify-end gap-3 whitespace-nowrap sm:w-auto sm:gap-7">
      <div class="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          class="small sm:!h-10 sm:!w-10"
          matIconButton
          routerLink="/wishlist"
          [matBadge]="store.wishlistCount()"
          [matBadgeHidden]="store.wishlistCount() === 0"
        >
          <mat-icon>favorite</mat-icon>
        </button>
        <button
          class="small sm:!h-10 sm:!w-10"
          matIconButton
          routerLink="/cart"
          [matBadge]="store.cartCount()"
          [matBadgeHidden]="store.cartCount() === 0"
        >
          <mat-icon>shopping_cart</mat-icon>
        </button>
      @if (store.user(); as User) {
        <button matIconButton [matMenuTriggerFor]="userMenu">
          <img
            [src]="store.user()?.imageUrl"
            alt="Profile"
            class="w-8 h-8 rounded-full object-cover"
          />
        </button>
        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 min-w-[200px]">
            <span class=" text-sm font-medium">{{ store.user()?.name }}</span>
            <span class="text-xs text-gray-500">{{ store.user()?.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button class="!min-h-[32px]" mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon>
            Sign out
          </button>
        </mat-menu>
      }
      </div>
      @if (!store.user()) {
        <div class="flex min-w-0 shrink items-center justify-end gap-1 sm:gap-2">
          <button
            matButton
            class="!min-w-0 !px-2.5 text-[11px] whitespace-nowrap sm:text-sm sm:!px-3"
            (click)="openSignInDialog()"
          >
            Sign in
          </button>
          <button
            matButton="filled"
            class="!min-w-0 !px-2.5 text-[11px] whitespace-nowrap sm:text-sm sm:!px-3"
            (click)="openSignUpDialog()"
          >
            Sign up
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      flex: 1 1 auto;
      min-width: 0;
    }

    @media (min-width: 640px) {
      :host {
        flex: 0 0 auto;
      }
    }
  `,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
    });
  }
  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
    });
  }
}
