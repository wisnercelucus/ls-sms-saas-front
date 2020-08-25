import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOverviewComponent } from './terms-overview.component';

describe('TermsOverviewComponent', () => {
  let component: TermsOverviewComponent;
  let fixture: ComponentFixture<TermsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
