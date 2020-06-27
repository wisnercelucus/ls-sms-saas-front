import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSideMenuComponent } from './feed-side-menu.component';

describe('FeedSideMenuComponent', () => {
  let component: FeedSideMenuComponent;
  let fixture: ComponentFixture<FeedSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
