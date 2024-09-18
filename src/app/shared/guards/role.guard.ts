import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@shared/models/user.interface';
import { AuthService } from '@shared/services/auth.service';

export const allowRoles = (...roles: UserRole[]) => {
  const roleGuard: CanActivateFn = () => {
    const userRole = inject(AuthService).getUserRole();
    const router = inject(Router);

    const isValid = roles.some((role) => userRole === role);
    if (!isValid) router.navigate(['/']);

    return isValid;
  };
  return roleGuard;
};
