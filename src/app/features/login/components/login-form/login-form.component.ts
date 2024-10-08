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
      <div class="flex justify-between text-xs font-mono font-bold">
        <a
          href="https://uspiri.com"
          target="_blank"
          class="text-neutral-400 hover:text-neutral-800 transition"
          >By uspiri</a
        >
        <a
          href="https://github.com/USpiri/user-posts"
          target="_blank"
          class="text-neutral-400 hover:text-neutral-800 transition"
          >Github</a
        >
      </div>
    </form>
  `,
})
export class LoginFormComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  loading = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
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
