import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getToken().pipe(
      take(1),
      switchMap((token) => {
        if (!token) {
          const localStorageToken = localStorage.getItem('token');
          if (localStorageToken) {
            this.authService.resetStoreFromLocalStorage();
            token = localStorageToken;
          }
        }
        return of(token);
      }),
      map((token) => {
        console.log(token, 'Checking token in AuthGuard');
        if (token) {
          this.router.navigate(['/user/listing']);
          return false;
        }
        return true;
      })
    );
  }
}
