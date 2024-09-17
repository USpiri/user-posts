import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Edit, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, AsyncPipe],
  template: `
    <article
      class="border bg-neutral-50 px-3 py-1.5 border-neutral-300 w-full rounded-md relative justify-between flex"
    >
      <header>
        <h2 class="font-semibold text-xl">Title</h2>
        <p class="text-sm">Description</p>
      </header>
      @if ((user$ | async)?.role === 'admin') {
        <footer>
          <a class="icon btn block" title="Edit post" routerLink="./edit/a">
            <i-lucide [img]="edit" class="w-5 h-5" />
          </a>
        </footer>
      }
    </article>
  `,
})
export class PostItemComponent {
  private auth = inject(AuthService);
  user$ = this.auth.user$;
  readonly edit = Edit;
}
