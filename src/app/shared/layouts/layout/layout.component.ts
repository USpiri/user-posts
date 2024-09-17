import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="grid grid-rows-[auto_1fr] min-h-dvh">
      <app-navbar />
      <div>
        <router-outlet />
      </div>
    </div>
  `,
})
export class LayoutComponent {}
