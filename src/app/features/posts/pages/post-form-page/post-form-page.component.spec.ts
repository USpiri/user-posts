import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormPageComponent } from './post-form-page.component';

describe('PostFormPageComponent', () => {
  let component: PostFormPageComponent;
  let fixture: ComponentFixture<PostFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
