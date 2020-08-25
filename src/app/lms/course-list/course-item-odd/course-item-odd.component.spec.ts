import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemOddComponent } from './course-item-odd.component';

describe('CourseItemOddComponent', () => {
  let component: CourseItemOddComponent;
  let fixture: ComponentFixture<CourseItemOddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemOddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
