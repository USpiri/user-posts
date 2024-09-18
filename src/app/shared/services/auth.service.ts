import { Injectable } from '@angular/core';
import { User } from '@shared/models/user.interface';
import { login } from '@shared/utils/auth';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(
    this.getUserfromLocalStorage(),
  );
  user$ = this.userSubject.asObservable();

  login(email: string, password: string) {
    return login(email, password).pipe(
      tap(({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.userSubject.next(user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserRole() {
    return this.userSubject.value?.role;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private getUserfromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
