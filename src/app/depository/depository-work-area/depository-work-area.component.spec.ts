import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoryWorkAreaComponent } from './depository-work-area.component';

describe('DepositoryWorkAreaComponent', () => {
  let component: DepositoryWorkAreaComponent;
  let fixture: ComponentFixture<DepositoryWorkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoryWorkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoryWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
