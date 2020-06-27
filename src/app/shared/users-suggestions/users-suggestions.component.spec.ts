import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSuggestionsComponent } from './users-suggestions.component';

describe('UsersSuggestionsComponent', () => {
  let component: UsersSuggestionsComponent;
  let fixture: ComponentFixture<UsersSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
