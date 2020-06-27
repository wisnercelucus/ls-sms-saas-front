import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTimelineComponent } from './feed-timeline.component';

describe('FeedTimelineComponent', () => {
  let component: FeedTimelineComponent;
  let fixture: ComponentFixture<FeedTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
