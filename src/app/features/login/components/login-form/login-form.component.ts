import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogIn, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="flex flex-col gap-3 mt-5">
      <label>
        <span>Email</span>
        <input
          placeholder="Email"
          required
          type="email"
          formControlName="email"
        />

        @if (getControl('email').invalid && getControl('email').touched) {
          <span class="text-red-500 text-sm">Email must be valid</span>
        }
      </label>

      <label>
        <span>Password</span>
        <input
          placeholder="********"
          required
          type="password"
          formControlName="password"
        />

        @if (getControl('password').invalid && getControl('password').touched) {
          <span class="text-red-500 text-sm"
            >Password is required and must have at least 6 characters</span
          >
        }
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
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly login = LogIn;

  onLogin() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.router.navigate(['/']);
  }

  getControl(controlName: string) {
    return this.form.get(controlName)!;
  }
}
