import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/auth.actions';
import { selectToken } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private store: Store) {}

  register(username: string, email: string, password: string): Observable<any> {
    const payload = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.store.dispatch(loginSuccess({ token }));
      })
    );
  }


  resetPassword(code: string, email: string, password: string, confirm_password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { code, email, password, confirm_password }).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);  
        this.store.dispatch(loginSuccess({ token }));
      })
    );
  }


  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password-request`, { email }).pipe(
      tap((response: any) => {
        if(response.status){
          return response.email;
        }else{
          alert(response.message)
          return false;
        }
        // console.log(response, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout()); 
  }


  getToken(): Observable<string | null> {
    return this.store.select(selectToken);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(
      map((token) => !!token)
    );
  }

  resetStoreFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }

}
