import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [LucideAngularModule, NgClass],
  template: `
    <div class="flex justify-between items-center gap-2 font-mono text-sm">
      <div>Results: {{ totalResults }}</div>
      <div class="flex items-center">
        <button
          (click)="previourPage.emit()"
          [ngClass]="actualPage <= 1 ? 'invisible' : ''"
          aria-label="Previous page"
        >
          <i-lucide [img]="chevronRight" class="rotate-180 h-5 w-5" />
        </button>

        <span class="text-base">{{ actualPage }} / {{ totalPages }}</span>

        <button
          (click)="nextPage.emit()"
          [ngClass]="actualPage === totalPages ? 'invisible' : ''"
          aria-label="Next page"
        >
          <i-lucide [img]="chevronRight" class="h-5 w-5" />
        </button>
      </div>
      <label>
        <select
          (change)="pageSizeChange.emit($event)"
          class="min-w-16 rounded border border-neutral-300"
        >
          @for (item of pagesOptions; track $index) {
            <option [value]="item">{{ item }}</option>
          }
        </select>
      </label>
    </div>
  `,
  styles: ``,
})
export class PaginatorComponent {
  @Input({ required: true }) totalResults = 0;
  @Input({ required: true }) actualPage = 0;
  @Input({ required: true }) totalPages = 0;
  @Input({ required: true }) pagesOptions: number[] = [];
  @Output() pageSizeChange = new EventEmitter<Event>();
  @Output() nextPage = new EventEmitter<null>();
  @Output() previourPage = new EventEmitter<null>();

  readonly chevronRight = ChevronRight;
}
