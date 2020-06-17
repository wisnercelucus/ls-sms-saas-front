import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { FeedService } from './feed.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  instanceSub: Subscription;
  userSubs: Subscription;
  
  constructor(private authService: AuthService, 
    private feedService:FeedService,
    private appService:AppService
    ) { }

  ngOnInit(): void {

  }

  getPosts(instance:string){
    
  }
  

  ngOnDestroy(){

  }

}
