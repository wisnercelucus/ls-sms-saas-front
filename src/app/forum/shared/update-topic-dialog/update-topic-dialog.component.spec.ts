import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicDialogComponent } from './update-topic-dialog.component';

describe('UpdateTopicDialogComponent', () => {
  let component: UpdateTopicDialogComponent;
  let fixture: ComponentFixture<UpdateTopicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTopicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
