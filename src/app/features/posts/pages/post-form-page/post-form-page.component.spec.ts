import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormPageComponent } from './post-form-page.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PostFormPageComponent', () => {
  let component: PostFormPageComponent;
  let fixture: ComponentFixture<PostFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFormPageComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
