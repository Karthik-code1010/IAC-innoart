import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subnet2Component } from './subnet2.component';

describe('Subnet2Component', () => {
  let component: Subnet2Component;
  let fixture: ComponentFixture<Subnet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subnet2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Subnet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
