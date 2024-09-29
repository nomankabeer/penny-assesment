import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
        if (!token) {
          this.router.navigate(['/auth']);
          return false;
        }
        return true;
      })
    );
  }
}
