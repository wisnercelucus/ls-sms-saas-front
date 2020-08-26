import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailSideMenuComponent } from './course-detail-side-menu.component';

describe('CourseDetailSideMenuComponent', () => {
  let component: CourseDetailSideMenuComponent;
  let fixture: ComponentFixture<CourseDetailSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
