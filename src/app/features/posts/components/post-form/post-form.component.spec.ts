import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostFormComponent,
        RouterModule.forRoot([
          {
            path: 'new',
            component: PostFormComponent,
          },
          {
            path: 'edit/:id',
            component: PostFormComponent,
          },
        ]),
      ],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on invalid inputs', () => {
    component.form.setValue({ title: '', body: '' });

    expect(component.form.valid).toBeFalse();
    expect(
      fixture.nativeElement.querySelectorAll('.ng-invalid').length,
    ).toBeGreaterThan(0);
  });

  it('should not show error on valid inputs', () => {
    const post = { title: 'Title', body: 'Body' };
    component.form.setValue(post);
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('.ng-invalid').length).toBe(
      0,
    );
    expect(component.form.value).toEqual(post);
  });
});
