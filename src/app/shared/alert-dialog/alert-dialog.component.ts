import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit, OnDestroy {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor() { }
  ngOnDestroy(): void {
    this.close.unsubscribe()
  }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }
  
}
