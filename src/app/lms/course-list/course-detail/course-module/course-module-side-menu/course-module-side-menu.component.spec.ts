import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleSideMenuComponent } from './course-module-side-menu.component';

describe('CourseModuleSideMenuComponent', () => {
  let component: CourseModuleSideMenuComponent;
  let fixture: ComponentFixture<CourseModuleSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModuleSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModuleSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
