import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShareModalFormComponent } from './post-share-modal-form.component';

describe('PostShareModalFormComponent', () => {
  let component: PostShareModalFormComponent;
  let fixture: ComponentFixture<PostShareModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShareModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShareModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
