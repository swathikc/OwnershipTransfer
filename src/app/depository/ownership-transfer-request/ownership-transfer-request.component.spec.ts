import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipTransferRequestComponent } from './ownership-transfer-request.component';

describe('OwnershipTransferRequestComponent', () => {
  let component: OwnershipTransferRequestComponent;
  let fixture: ComponentFixture<OwnershipTransferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnershipTransferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
