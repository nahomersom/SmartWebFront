import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainFormComponent } from './complain-form.component';

describe('ComplainFormComponent', () => {
  let component: ComplainFormComponent;
  let fixture: ComponentFixture<ComplainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
