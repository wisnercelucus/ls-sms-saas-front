import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModulLessonComponent } from './course-modul-lesson.component';

describe('CourseModulLessonComponent', () => {
  let component: CourseModulLessonComponent;
  let fixture: ComponentFixture<CourseModulLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModulLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModulLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
