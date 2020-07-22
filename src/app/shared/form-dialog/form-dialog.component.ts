import { Component, OnInit } from '@angular/core';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  constructor(){}
}
