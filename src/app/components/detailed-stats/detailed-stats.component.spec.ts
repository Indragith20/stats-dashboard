import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStatsComponent } from './detailed-stats.component';

describe('DetailedStatsComponent', () => {
  let component: DetailedStatsComponent;
  let fixture: ComponentFixture<DetailedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
