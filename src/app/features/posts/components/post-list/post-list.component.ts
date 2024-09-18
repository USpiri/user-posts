import { Component, inject, OnInit } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostService } from '@shared/services/post.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostItemComponent, LoaderComponent],
  template: `
    @if (!postState().loading) {
      <div class="flex flex-col gap-2">
        @for (post of postState().posts; track post.id) {
          <app-post-item [post]="post" />
        } @empty {
          <p>There is no posts to show</p>
        }
      </div>
    } @else {
      <app-loader />
    }
  `,
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  postState = this.postService.postState;

  ngOnInit() {
    // This only makes the request once to avoid resetting the loaded data
    if (this.postState().posts.length === 0) this.postService.getPosts();
  }
}
