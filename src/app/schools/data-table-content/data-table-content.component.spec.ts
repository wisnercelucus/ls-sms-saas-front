import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableContentComponent } from './data-table-content.component';

describe('DataTableContentComponent', () => {
  let component: DataTableContentComponent;
  let fixture: ComponentFixture<DataTableContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
