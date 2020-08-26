import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWikiComponent } from './course-wiki.component';

describe('CourseWikiComponent', () => {
  let component: CourseWikiComponent;
  let fixture: ComponentFixture<CourseWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
