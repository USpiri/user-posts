import { Component } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <main class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-stone-100 shadow-lg rounded-lg border p-5 max-w-sm w-full">
        <h1 class="text-lg mb-4 font-mono text-center font-bold">
          Users&Posts
        </h1>
        <h2 class="text-3xl font-bold">Login</h2>
        <app-login-form />
      </div>
    </main>
  `,
})
export class LoginComponent {}
