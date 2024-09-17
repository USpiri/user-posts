import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on invalid inputs', () => {
    component.form.setValue({ email: '', password: '' });

    expect(component.form.valid).toBeFalse();
    expect(
      fixture.nativeElement.querySelectorAll('.ng-invalid').length,
    ).toBeGreaterThan(0);
  });

  it('should not show error on valid inputs', () => {
    component.form.setValue({ email: 'email@email.com', password: '1234567' });
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('.ng-invalid').length).toBe(
      0,
    );
  });
});
