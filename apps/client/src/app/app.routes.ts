import { Routes } from '@angular/router';

import { LoginComponent } from './auth/modules/login/login.component';
import { SignupComponent } from './auth/modules/signup/signup.component';
import { ForgotPasswordComponent } from './auth/modules/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/modules/reset-password/reset-password.component';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { UserListingComponent } from './user/listing/user-listing.component';

export const appRoutes: Routes = [
  {
    path: 'auth',
    canActivate: [GuestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'listing',component: UserListingComponent },
    ],
  },
  { path: '**', redirectTo: '/auth/login' },
];
