import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { ToastService } from '@shared/services/toast.service';
import { LoaderCircle, LogIn, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, NgClass],
  template: `
    <form
      [formGroup]="form"
      class="flex flex-col gap-3 mt-5"
      (ngSubmit)="onLogin()"
    >
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
        type="submit"
        class="black mt-2 flex items-center justify-center gap-4"
        [disabled]="loading"
      >
        Login
        <i-lucide
          [img]="loading ? loadingIcon : login"
          class="w-5 h-5"
          [ngClass]="loading ? 'animate-spin' : ''"
        />
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  loading = false;
  // TODO: Delete default values
  form = this.fb.group({
    email: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['admin1237', [Validators.required, Validators.minLength(6)]],
  });

  readonly login = LogIn;
  readonly loadingIcon = LoaderCircle;

  onLogin() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.loading = true;
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.open({
          title: 'Error',
          message: `Error: ${err}`,
          type: 'error',
        });
        this.loading = false;
      },
    });
  }

  getControl(controlName: string) {
    return this.form.get(controlName)!;
  }
}
