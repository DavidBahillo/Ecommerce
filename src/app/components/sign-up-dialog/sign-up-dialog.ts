import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatFormField,
    MatInput,

    MatPrefix,
    MatAnchor,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex w-[min(100vw-2rem,400px)] max-w-[400px] flex-col p-4 sm:p-8">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="Enter your name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="email" matInput type="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input
            formControlName="password"
            matInput
            type="password"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input
            formControlName="confirmPassword"
            matInput
            type="password"
            placeholder="Confirm your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full" >
         Create Account
        </button>
      </form>
      <p class="mt-3 text-center text-sm text-gray-500">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA) as {checkout?:boolean};
  matDialog = inject(MatDialog);
  signUpForm = this.fb.group({
    name: ['Akis Bahillo', Validators.required],
    email: ['akisbahillo@test.com', Validators.required],
    password: ['123', Validators.required],
    confirmPassword: ['123', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      return;
    }
    const { name, email, password } = this.signUpForm.value;
   this.store.signUp({name, email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id} as SignUpParams);
  }
  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data:{
        checkout: this.data?.checkout
      }
    });
  }
}
