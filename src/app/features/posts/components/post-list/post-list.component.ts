import { Component } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostItemComponent],
  template: `
    <div class="flex flex-col gap-2">
      <app-post-item />
      <app-post-item />
      <app-post-item />
      <app-post-item />
      <app-post-item />
    </div>
  `,
  styles: ``,
})
export class PostListComponent {}
