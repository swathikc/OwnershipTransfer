import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingMatchesComponent } from './view-pending-matches.component';

describe('ViewPendingMatchesComponent', () => {
  let component: ViewPendingMatchesComponent;
  let fixture: ComponentFixture<ViewPendingMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
