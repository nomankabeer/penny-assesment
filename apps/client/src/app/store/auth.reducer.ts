import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token
  })),
  on(logout, (state) => ({
    ...state,
    token: null
  }))
);
