import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from '@shared/models/post.interface';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = `${environment.apiURL}/posts`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  #postState = signal<{ posts: Post[]; loading: boolean }>({
    posts: [],
    loading: true,
  });
  postState = this.#postState.asReadonly();

  getPosts() {
    this.http.get<Post[]>(API).subscribe((posts) => {
      this.#postState.set({ posts, loading: false });
    });
  }

  getPostById(id: number) {
    const actualPost = this.#postState().posts.find((post) => post.id === id);
    if (actualPost) {
      return of(actualPost);
    }
    return this.http.get<Post>(`${API}/${id}`);
  }

  createPost(post: Post) {
    return this.http.post<Post>(API, { ...post }).pipe(
      tap((res) => {
        this.#postState.update((state) => ({
          ...state,
          posts: [res, ...state.posts],
        }));
      }),
    );
  }

  updatePost(post: Post) {
    return this.http.patch<Post>(`${API}/${post.id}`, { ...post }).pipe(
      tap((res) => {
        this.#postState.update((state) => ({
          ...state,
          posts: [...state.posts.map((p) => (p.id === res.id ? res : p))],
        }));
      }),
    );
  }
}
