import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnershipsComponent } from './view-ownerships.component';

describe('ViewOwnershipsComponent', () => {
  let component: ViewOwnershipsComponent;
  let fixture: ComponentFixture<ViewOwnershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
