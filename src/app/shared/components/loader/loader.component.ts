import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader rounded-sm overflow-hidden h-1 w-full bg-stone-200">
      <div class="progress-bar w-full h-full bg-stone-300"></div>
    </div>
  `,
  styles: `
    .progress-bar {
      animation: loader 1s infinite linear;
      transform-origin: 0% 50%;
    }

    @keyframes loader {
      0% {
        transform: translateX(0) scaleX(0);
      }
      40% {
        transform: translateX(0) scaleX(0.4);
      }
      100% {
        transform: translateX(100%) scaleX(0.5);
      }
    }
  `,
})
export class LoaderComponent {}
