import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: 'posts',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Posts',
        loadComponent: () =>
          import('./features/posts/pages/posts/posts.component').then(
            (m) => m.PostsComponent,
          ),
      },
      {
        path: 'edit/:id',
        title: 'Post Form',
        loadComponent: () =>
          import(
            './features/posts/pages/post-form-page/post-form-page.component'
          ).then((m) => m.PostFormPageComponent),
      },
      {
        path: 'new',
        title: 'Post Form',
        loadComponent: () =>
          import(
            './features/posts/pages/post-form-page/post-form-page.component'
          ).then((m) => m.PostFormPageComponent),
      },
    ],
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];
