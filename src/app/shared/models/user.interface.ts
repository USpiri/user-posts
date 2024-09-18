export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'user' | 'admin';
