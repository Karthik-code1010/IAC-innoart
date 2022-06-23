import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchInstanceComponent } from './launch-instance.component';

describe('LaunchInstanceComponent', () => {
  let component: LaunchInstanceComponent;
  let fixture: ComponentFixture<LaunchInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
