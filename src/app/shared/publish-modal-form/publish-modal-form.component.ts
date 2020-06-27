import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-publish-modal-form',
  templateUrl: './publish-modal-form.component.html',
  styleUrls: ['./publish-modal-form.component.css']
})
export class PublishModalFormComponent {
  constructor(
    public dialogRef: MatDialogRef<PublishModalFormComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
