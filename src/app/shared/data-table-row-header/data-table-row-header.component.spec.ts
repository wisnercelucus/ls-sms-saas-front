import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRowHeaderComponent } from './data-table-row-header.component';

describe('DataTableRowHeaderComponent', () => {
  let component: DataTableRowHeaderComponent;
  let fixture: ComponentFixture<DataTableRowHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableRowHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableRowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
