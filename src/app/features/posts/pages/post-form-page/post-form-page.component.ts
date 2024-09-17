import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-form-page',
  standalone: true,
  template: `
    <main class="section">
      <app-section-header title="Edit/Update Post">
        <a routerLink="/" class="btn black text-sm flex items-center gap-2">
          <i-lucide [img]="back" class="w-5 h-5" />
          Back
        </a>
      </app-section-header>

      <div class="bg-neutral-100 rounded-t-md shadow-md p-4 h-full">
        <app-post-form />
      </div>
    </main>
  `,
  imports: [
    SectionHeaderComponent,
    PostFormComponent,
    LucideAngularModule,
    RouterLink,
  ],
})
export class PostFormPageComponent {
  readonly back = ChevronLeft;
}
