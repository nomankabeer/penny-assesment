import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UserListingComponent } from './user-listing/user-listing.component';

export const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'user-listing',
    component: UserListingComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' }
];
