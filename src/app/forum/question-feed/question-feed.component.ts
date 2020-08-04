import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Topic } from '../topic.model';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-question-feed',
  templateUrl: './question-feed.component.html',
  styleUrls: ['./question-feed.component.css']
})
export class QuestionFeedComponent implements OnInit, OnDestroy {
  @Input() topicList: Topic[];
  tenantUrl:string;
  destroy$:Subject<void> = new Subject<void>();
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getTenantUrl();
  }

  getTenantUrl(){
    this.appService.TENANT_URL.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      url=>{
        this.tenantUrl = url;
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
