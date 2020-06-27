import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsSuggestionsComponent } from './groups-suggestions.component';

describe('GroupsSuggestionsComponent', () => {
  let component: GroupsSuggestionsComponent;
  let fixture: ComponentFixture<GroupsSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
