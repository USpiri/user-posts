import { Injectable } from '@angular/core';
import { login } from '@shared/utils/auth';
import { tap } from 'rxjs';

//TODO: Make interceptor to send jwt token on every request
//TODO: Make guard to protect routes

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    return login(email, password).pipe(
      tap((user) => localStorage.setItem('user', JSON.stringify(user))),
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  isAdmin() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role === 'admin' : false;
  }
}
