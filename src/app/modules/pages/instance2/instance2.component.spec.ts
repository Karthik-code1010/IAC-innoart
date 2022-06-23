import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instance2Component } from './instance2.component';

describe('Instance2Component', () => {
  let component: Instance2Component;
  let fixture: ComponentFixture<Instance2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Instance2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Instance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
