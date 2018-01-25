import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSlaveEditorComponent } from './master-slave-editor.component';

describe('MasterSlaveEditorComponent', () => {
  let component: MasterSlaveEditorComponent;
  let fixture: ComponentFixture<MasterSlaveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSlaveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSlaveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
