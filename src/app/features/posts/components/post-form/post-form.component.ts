import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '@shared/services/post.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { Post } from '@shared/models/post.interface';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  template: `
    @if (!loading) {
      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="flex flex-col gap-3"
      >
        <label>
          <span>Title</span>
          <input placeholder="Title" formControlName="title" />
          @if (getControl('title').invalid && getControl('title').touched) {
            <span class="text-red-500 text-sm">Title is required</span>
          }
        </label>

        <label>
          <span>Content</span>
          <textarea
            placeholder="Post body..."
            formControlName="body"
            class="min-h-20"
          ></textarea>
          @if (getControl('body').invalid && getControl('body').touched) {
            <span class="text-red-500 text-sm">Body is required</span>
          }
        </label>

        <button type="submit" class="black">Submit</button>
      </form>
    } @else {
      <app-loader />
    }
  `,
})
export class PostFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastService);

  loading = true;
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  post?: Post;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(Number(id)).subscribe({
        next: (data) => {
          this.form.patchValue(data);
          this.post = data;
          this.loading = false;
        },
        error: () => {
          this.onInvalidIDOrServerError();
        },
      });
    } else {
      this.loading = false;
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    const post = { ...this.post, ...this.form.value } as Post;
    const isNew = this.route.snapshot.routeConfig?.path === 'new';
    this.form.disable();

    const action = isNew
      ? this.postService.createPost(post)
      : this.postService.updatePost(post);

    action.subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toast.open({
          title: isNew ? 'New post created' : 'PostUpdated',
          message: '🥳🎉',
        });
      },
      error: () => {
        this.toast.open({
          title: 'Error',
          message: '🛑 Something went wrong, please try again later.',
          type: 'error',
        });
      },
      complete: () => {
        this.form.enable();
      },
    });
  }

  getControl(controlName: string) {
    return this.form.get(controlName)!;
  }

  onInvalidIDOrServerError() {
    this.router.navigate(['/']);
    this.toast.open({
      title: 'Error',
      message: '🛑 Something went wrong, please try again later.',
      type: 'error',
    });
  }
}
