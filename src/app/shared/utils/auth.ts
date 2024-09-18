import { User } from '@shared/models/user.interface';
import { delay, of, switchMap, throwError } from 'rxjs';

interface DBUser extends User {
  password: string;
}

// Simulates DB
const mockUsers: DBUser[] = [
  {
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'User',
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin',
  },
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
        return of({
          user: { email: user.email, role: user.role, name: user.name },
          token,
        });
      } else {
        return throwError(() => 'User not found');
      }
    }),
  );
};
