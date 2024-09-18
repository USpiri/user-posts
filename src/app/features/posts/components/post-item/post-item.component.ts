import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '@shared/models/post.interface';
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
        <h2 class="font-semibold text-xl">{{ post.title }}</h2>
        <p class="text-sm max-w-lg">{{ post.body }}</p>
      </header>
      @if ((user$ | async)?.role === 'admin') {
        <footer>
          <a
            class="icon btn block"
            title="Edit post"
            routerLink="./edit/{{ post.id }}"
          >
            <i-lucide [img]="edit" class="w-5 h-5" />
          </a>
        </footer>
      }
    </article>
  `,
})
export class PostItemComponent {
  @Input({ required: true }) post!: Post;
  user$ = inject(AuthService).user$;
  readonly edit = Edit;
}
