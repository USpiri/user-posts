import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  CanActivateFn,
  provideRouter,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '@shared/models/user.interface';
import { AuthService } from '@shared/services/auth.service';

const mockAuthService: {
  login(email: string, password: string): Observable<User>;
  logout: () => void;
  isLoggedIn: () => boolean;
  getUserRole: () => UserRole;
  getToken: () => string | null;
} = {
  // eslint-disable-next-line
  login: (email, _password) =>
    of({
      email,
      role: 'user',
      name: 'User',
    }),
  logout: () => undefined,
  isLoggedIn: () => true,
  getToken: () => 'token',
  getUserRole: () => 'user',
};

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow CanActivateFn', () => {
    const authSpy = spyOn(mockAuthService, 'isLoggedIn');
    authSpy.and.returnValue(true);
    const activatedRoute = TestBed.inject(ActivatedRoute);

    const result = executeGuard(
      activatedRoute.snapshot,
      {} as RouterStateSnapshot,
    );

    expect(result).toBeTruthy();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
  });

  it('should deny CanActivateFn', () => {
    const authSpy = spyOn(mockAuthService, 'isLoggedIn');
    authSpy.and.returnValue(false);
    const activatedRoute = TestBed.inject(ActivatedRoute);

    const result = executeGuard(
      activatedRoute.snapshot,
      {} as RouterStateSnapshot,
    );

    expect(result).toBeFalse();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
  });
});
