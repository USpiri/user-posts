import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  template: `
    <aside
      class="sm:max-w-sm z-10 w-full absolute top-4 sm:top-[unset] sm:bottom-4 sm:right-4 bg-stone-50 rounded-md shadow px-3 py-1"
      [ngClass]="status"
      [class.show]="visible"
    >
      <h3 class="font-bold">{{ title ?? 'Message:' }}</h3>
      <div class="text-sm">
        {{ message }}
      </div>
    </aside>
  `,
  styles: `
    aside {
      visibility: hidden;
      &.show {
        visibility: visible;
        -webkit-animation:
          fadein 0.2s,
          fadeout 0.2s 1.8s;
        animation:
          fadein 0.2s,
          fadeout 0.2s 1.8s;
      }
      &.error {
        @apply bg-red-50;
        & > h3 {
          @apply text-red-700;
        }
      }
      &.success {
        @apply bg-emerald-50;
        & > h3 {
          @apply text-emerald-700;
        }
      }
    }

    @keyframes fadein {
      from {
        transform: translateY(20px);
        opacity: 0;
      }

      to {
        transform: translateY(0px);
        opacity: 1;
      }
    }

    @keyframes fadeout {
      from {
        transform: translateY(0px);
        opacity: 1;
      }

      to {
        transform: translateY(20px);
        opacity: 0;
      }
    }
  `,
})
export class ToastComponent implements OnInit {
  private toastService = inject(ToastService);

  visible = false;
  title?: string;
  message = '';
  status = 'success';

  ngOnInit() {
    this.toastService.toastVisibility$.subscribe(
      (state) => (this.visible = state),
    );
    this.toastService.toast$.subscribe((toast) => {
      this.status = toast.type ?? 'success';
      this.message = toast.message;
      this.title = toast.title;
    });
  }
}
