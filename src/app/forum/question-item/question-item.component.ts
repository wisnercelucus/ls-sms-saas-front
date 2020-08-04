import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../topic.model';
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css'],
  
})
export class QuestionItemComponent implements OnInit {
  @Input() topic:Topic;
  @Input() tenantUrl:string;
  contentSafe:any;
  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.contentSafe = this.sanitizer.bypassSecurityTrustHtml(this.topic['content'])
  }


}
