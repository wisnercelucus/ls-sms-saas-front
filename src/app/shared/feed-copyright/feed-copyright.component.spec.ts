import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCopyrightComponent } from './feed-copyright.component';

describe('FeedCopyrightComponent', () => {
  let component: FeedCopyrightComponent;
  let fixture: ComponentFixture<FeedCopyrightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCopyrightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCopyrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
