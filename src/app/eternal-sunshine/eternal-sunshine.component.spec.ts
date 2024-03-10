import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EternalSunshineComponent } from './eternal-sunshine.component';

describe('EternalSunshineComponent', () => {
  let component: EternalSunshineComponent;
  let fixture: ComponentFixture<EternalSunshineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EternalSunshineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EternalSunshineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
