import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  const newReq = authToken
    ? req.clone({
        headers: req.headers.append('Authorization', `Bearer ${authToken}`),
      })
    : req;

  return next(newReq);
};
