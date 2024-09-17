import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <header class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <ng-content />
    </header>
  `,
})
export class SectionHeaderComponent {
  @Input({ required: true }) title = '';
}
