import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.css']
})
export class EventDetailDialogComponent implements OnInit {
  @Input() modalData:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
