import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishModalFormComponent } from './publish-modal-form.component';

describe('PublishModalFormComponent', () => {
  let component: PublishModalFormComponent;
  let fixture: ComponentFixture<PublishModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
