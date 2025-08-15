import { ComponentFixture, TestBed } from '@angular/core/testing';
import { applicationRegistrationComponent } from './applicationRegistration.component';

describe('applicationRegistrationComponent', () => {
  let component: applicationRegistrationComponent;
  let fixture: ComponentFixture<applicationRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [applicationRegistrationComponent]
    });
    fixture = TestBed.createComponent(applicationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
