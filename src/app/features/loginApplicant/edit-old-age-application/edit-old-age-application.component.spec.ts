import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOldAgeApplicationComponent } from './edit-old-age-application.component';

describe('EditOldAgeApplicationComponent', () => {
  let component: EditOldAgeApplicationComponent;
  let fixture: ComponentFixture<EditOldAgeApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOldAgeApplicationComponent]
    });
    fixture = TestBed.createComponent(EditOldAgeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
