import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDonationComponent } from './process-donation.component';

describe('ProcessDonationComponent', () => {
  let component: ProcessDonationComponent;
  let fixture: ComponentFixture<ProcessDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
