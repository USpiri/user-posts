import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostService } from '@shared/services/post.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { LucideAngularModule, Search } from 'lucide-angular';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostItemComponent,
    LoaderComponent,
    LucideAngularModule,
    PaginatorComponent,
  ],
  template: `
    <div class="flex flex-col gap-3 h-full">
      @if (!postState().loading) {
        <label
          class="border flex items-center border-neutral-300 rounded-md px-2 py-1 gap-2 bg-white"
        >
          <i-lucide [img]="search" class="w-4 h-4" />
          <input
            placeholder="Search"
            class="w-full outline-none"
            #searchQuery
            (input)="onSearchUpdated(searchQuery.value)"
          />
        </label>

        <div class="flex flex-col gap-2 h-full">
          @for (post of items(); track post.id) {
            <app-post-item [post]="post" />
          } @empty {
            <p>There is no posts to show...</p>
          }
        </div>

        <app-paginator
          class="mb-5"
          [totalResults]="items().length"
          [actualPage]="actualPage()"
          [totalPages]="totalPages"
          [pagesOptions]="[5, 10, 25]"
          (previourPage)="changePage(-1)"
          (nextPage)="changePage(1)"
          (pageSizeChange)="onChangePageSize($event)"
        />
      } @else {
        <app-loader />
      }
    </div>
  `,
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);
  postState = this.postService.postState;

  readonly search = Search;

  searchQuery = signal('');
  items = computed(() => {
    const query = this.searchQuery();

    const updated = this.postState().posts.filter((post) =>
      post.title.toLowerCase().includes(query),
    );

    this.totalPages = Math.ceil(updated.length / this.elementsPerPage());

    const start = (this.actualPage() - 1) * this.elementsPerPage();
    const end = start + this.elementsPerPage();

    return updated.slice(start, end);
  });

  elementsPerPage = signal<number>(5);
  actualPage = signal<number>(1);
  totalPages = 1;

  ngOnInit() {
    // This only makes the request once to avoid resetting the loaded data
    if (this.postState().posts.length === 0) this.postService.getPosts();
  }

  onSearchUpdated(query: string) {
    this.searchQuery.set(query);
    this.actualPage.set(1);
  }

  onChangePageSize(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.elementsPerPage.set(value);
    this.actualPage.set(1);
  }

  changePage(sum: number) {
    this.actualPage.update((value) => value + sum);
  }
}
