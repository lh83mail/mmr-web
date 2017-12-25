import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMgrComponent } from './users-mgr.component';

describe('UsersMgrComponent', () => {
  let component: UsersMgrComponent;
  let fixture: ComponentFixture<UsersMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
