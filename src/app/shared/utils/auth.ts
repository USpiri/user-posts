import { delay, of, switchMap, throwError } from 'rxjs';

// DB
const mockUsers = [
  { email: 'user@example.com', password: 'user123', role: 'user' },
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
];

// Emulates a login request
export const login = (email: string, password: string) => {
  return of({ email, password }).pipe(
    delay(1000),
    switchMap(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        const token = 'some-jwt-token';
        return of({ email: user.email, role: user.role, token });
      } else {
        return throwError(() => 'User not found');
      }
    }),
  );
};
