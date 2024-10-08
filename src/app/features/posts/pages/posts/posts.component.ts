import { Component, inject } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    LucideAngularModule,
    SectionHeaderComponent,
    PostListComponent,
    RouterLink,
    AsyncPipe,
  ],
  template: `
    <main class="section">
      <app-section-header title="Posts">
        @if ((user$ | async)?.role === 'admin') {
          <a
            routerLink="./new"
            class="btn flex text-sm gap-2 items-center black"
          >
            Add
            <i-lucide [img]="plus" class="h-5 w-5" />
          </a>
        }
      </app-section-header>

      <div class="bg-neutral-100 rounded-t-md shadow-md p-4 h-full">
        <app-post-list />
      </div>
    </main>
  `,
})
export class PostsComponent {
  private auth = inject(AuthService);
  user$ = this.auth.user$;
  readonly plus = Plus;
}
