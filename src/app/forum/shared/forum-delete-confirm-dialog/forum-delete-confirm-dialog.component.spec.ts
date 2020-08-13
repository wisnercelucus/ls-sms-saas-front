import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumDeleteConfirmDialogComponent } from './forum-delete-confirm-dialog.component';

describe('ForumDeleteConfirmDialogComponent', () => {
  let component: ForumDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<ForumDeleteConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumDeleteConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
