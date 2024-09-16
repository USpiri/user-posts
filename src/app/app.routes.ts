import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    title: 'Posts',
    loadComponent: () =>
      import('./features/posts/pages/posts/posts.component').then(
        (m) => m.PostsComponent,
      ),
  },
  {
    path: 'posts/:id',
    title: 'Post Form',
    loadComponent: () =>
      import('./features/posts/pages/post-form/post-form.component').then(
        (m) => m.PostFormComponent,
      ),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];
