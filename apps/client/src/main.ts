import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { authReducer } from './app/store/auth.reducer';
import { loginSuccess } from './app/store/auth.actions';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';  // Optional for debugging
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes),
    importProvidersFrom(StoreModule.forRoot({ auth: authReducer })),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25 })),  // Optional for debugging
    importProvidersFrom(CommonModule),  // Import CommonModule here
  ],
}).then(appRef => {
  const store = appRef.injector.get(Store);

  // Rehydrate the store with token from localStorage
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);  // Debug statement

  if (token) {
    store.dispatch(loginSuccess({ token }));  // Dispatch token to the store
    console.log('Token dispatched to the store');  // Debug statement
  }
}).catch((err) => console.error(err));