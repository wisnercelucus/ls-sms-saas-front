import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailDialogComponent } from './todo-detail-dialog.component';

describe('TodoDetailDialogComponent', () => {
  let component: TodoDetailDialogComponent;
  let fixture: ComponentFixture<TodoDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
