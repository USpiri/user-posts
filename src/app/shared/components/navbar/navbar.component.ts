import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  template: `
    <nav class="w-full bg-stone-100 shadow">
      <div
        class="max-w-3xl mx-auto w-full flex px-4 py-3 justify-between *:flex *:items-center"
      >
        <div>
          <a class="font-bold font-mono" routerLink="/">Users&Posts</a>
        </div>
        <div>
          <button class="icon" title="Logout" (click)="onLogout()">
            <i-lucide [img]="logout" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private router = inject(Router);
  readonly logout = LogOut;

  onLogout() {
    this.router.navigate(['/login']);
  }
}
