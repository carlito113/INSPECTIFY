import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyComponent } from './monthly.component';

describe('MonthlyComponent', () => {
  let component: MonthlyComponent;
  let fixture: ComponentFixture<MonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
