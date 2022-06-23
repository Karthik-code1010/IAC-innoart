import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IacStackComponent } from './iac-stack.component';

describe('IacStackComponent', () => {
  let component: IacStackComponent;
  let fixture: ComponentFixture<IacStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IacStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IacStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
