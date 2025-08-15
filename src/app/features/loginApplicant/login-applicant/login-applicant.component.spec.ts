import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginApplicantComponent } from './login-applicant.component';

describe('LoginApplicantComponent', () => {
  let component: LoginApplicantComponent;
  let fixture: ComponentFixture<LoginApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginApplicantComponent]
    });
    fixture = TestBed.createComponent(LoginApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
