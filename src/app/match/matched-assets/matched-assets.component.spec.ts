import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedAssetsComponent } from './matched-assets.component';

describe('MatchedAssetsComponent', () => {
  let component: MatchedAssetsComponent;
  let fixture: ComponentFixture<MatchedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
