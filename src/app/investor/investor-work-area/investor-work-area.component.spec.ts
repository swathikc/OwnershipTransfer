import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorWorkAreaComponent } from './investor-work-area.component';

describe('InvestorWorkAreaComponent', () => {
  let component: InvestorWorkAreaComponent;
  let fixture: ComponentFixture<InvestorWorkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorWorkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
