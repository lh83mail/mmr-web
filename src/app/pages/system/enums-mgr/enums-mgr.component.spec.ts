import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumsMgrComponent } from './enums-mgr.component';

describe('EnumsMgrComponent', () => {
  let component: EnumsMgrComponent;
  let fixture: ComponentFixture<EnumsMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumsMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumsMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
