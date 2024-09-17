import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <form class="flex flex-col gap-4 mt-5">
      <label>
        <span>Email</span>
        <input placeholder="Email" />
      </label>

      <label>
        <span>Password</span>
        <input placeholder="********" />
      </label>

      <button
        (click)="onLogin()"
        type="button"
        class="black mt-2 flex items-center justify-center gap-4"
      >
        Login
        <i-lucide [img]="login" class="w-4 h-4" />
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private router = inject(Router);
  readonly login = LogIn;

  onLogin() {
    this.router.navigate(['/']);
  }
}
