import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDefComponent } from './object-def.component';

describe('ObjectDefComponent', () => {
  let component: ObjectDefComponent;
  let fixture: ComponentFixture<ObjectDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
