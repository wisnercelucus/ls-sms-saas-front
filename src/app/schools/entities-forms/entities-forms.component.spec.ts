import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesFormsComponent } from './entities-forms.component';

describe('EntitiesFormsComponent', () => {
  let component: EntitiesFormsComponent;
  let fixture: ComponentFixture<EntitiesFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
