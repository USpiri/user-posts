import { Routes } from '@angular/router';
import { authGuard } from '@shared/guards/auth.guard';
import { allowRoles } from '@shared/guards/role.guard';
import { LayoutComponent } from '@shared/layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: LayoutComponent,
    canActivate: [authGuard],
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
        canActivate: [allowRoles('admin')],
      },
      {
        path: 'new',
        title: 'Post Form',
        loadComponent: () =>
          import(
            './features/posts/pages/post-form-page/post-form-page.component'
          ).then((m) => m.PostFormPageComponent),
        canActivate: [allowRoles('admin')],
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
    path: '**',
    redirectTo: 'posts',
  },
];
