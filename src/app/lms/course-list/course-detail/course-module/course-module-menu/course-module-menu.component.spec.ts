import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleMenuComponent } from './course-module-menu.component';

describe('CourseModuleMenuComponent', () => {
  let component: CourseModuleMenuComponent;
  let fixture: ComponentFixture<CourseModuleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModuleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModuleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
