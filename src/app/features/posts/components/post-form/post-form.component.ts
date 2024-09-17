import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  standalone: true,
  template: `
    <form class="flex flex-col gap-3">
      <label>
        <span>Title</span>
        <input />
      </label>

      <label>
        <span>Title</span>
        <textarea></textarea>
      </label>

      <button class="black">Submit</button>
    </form>
  `,
})
export class PostFormComponent {}
