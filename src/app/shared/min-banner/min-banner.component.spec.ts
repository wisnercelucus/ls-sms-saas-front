import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinBannerComponent } from './min-banner.component';

describe('MinBannerComponent', () => {
  let component: MinBannerComponent;
  let fixture: ComponentFixture<MinBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
