import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillestoneOverviewComponent } from './millestone-overview.component';

describe('MillestoneOverviewComponent', () => {
  let component: MillestoneOverviewComponent;
  let fixture: ComponentFixture<MillestoneOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillestoneOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillestoneOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
