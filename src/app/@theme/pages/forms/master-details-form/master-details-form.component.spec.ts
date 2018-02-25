import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailsFormComponent } from './master-details-form.component';

describe('MasterDetailsFormComponent', () => {
  let component: MasterDetailsFormComponent;
  let fixture: ComponentFixture<MasterDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
