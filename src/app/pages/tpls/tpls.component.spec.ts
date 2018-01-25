import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplsComponent } from './tpls.component';

describe('TplsComponent', () => {
  let component: TplsComponent;
  let fixture: ComponentFixture<TplsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
