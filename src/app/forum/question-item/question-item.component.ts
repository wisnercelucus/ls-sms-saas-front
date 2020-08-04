import { Component, OnInit, Input, Sanitizer, SecurityContext } from '@angular/core';
import { Topic } from '../topic.model';
//import {BROWSER_SANITIZATION_PROVIDERS, DomSanitizationService} from '@angular/platform-browser';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {
  @Input() topic:Topic;
  @Input() tenantUrl:string;
  constructor(public _sanitizer: Sanitizer) { }

  ngOnInit(): void {
  }

}
