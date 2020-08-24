import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {
  @Input() moderator:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
