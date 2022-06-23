import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityZoneComponent } from './availability-zone.component';

describe('AvailabilityZoneComponent', () => {
  let component: AvailabilityZoneComponent;
  let fixture: ComponentFixture<AvailabilityZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
