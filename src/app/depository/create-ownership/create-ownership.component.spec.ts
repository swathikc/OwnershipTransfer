import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnershipComponent } from './create-ownership.component';

describe('CreateOwnershipComponent', () => {
  let component: CreateOwnershipComponent;
  let fixture: ComponentFixture<CreateOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
