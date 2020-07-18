import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReportDialogComponent } from './post-report-dialog.component';

describe('PostReportDialogComponent', () => {
  let component: PostReportDialogComponent;
  let fixture: ComponentFixture<PostReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
