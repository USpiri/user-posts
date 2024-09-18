import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  const router = inject(Router);

  if (!isLoggedIn) {
    router.navigate(['/login']);
  }

  return isLoggedIn;
};
