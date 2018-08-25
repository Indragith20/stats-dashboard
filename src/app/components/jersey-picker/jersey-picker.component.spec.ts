import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyPickerComponent } from './jersey-picker.component';

describe('JerseyPickerComponent', () => {
  let component: JerseyPickerComponent;
  let fixture: ComponentFixture<JerseyPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JerseyPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JerseyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
