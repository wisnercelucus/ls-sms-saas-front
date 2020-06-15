import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  instanceSub: Subscription;
  userSubs: Subscription;
  constructor(private authService: AuthService, private feedService:FeedService) { }

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(user=>{
      if(user){
        this.instanceSub = this.authService.instance.subscribe(instance => {
          if(instance){
            console.log(instance);
          }
        })
      }else{
        return;
      }
    })

    this.getPosts('fdsa');

  }

  getPosts(instance:string){
    this.feedService.getPosts(instance).subscribe(posts=>{
      console.log(posts);
    })
  }
  

  ngOnDestroy(){
    if(this.instanceSub){
        this.instanceSub.unsubscribe();
    }

    if(this.userSubs){
      this.userSubs.unsubscribe();
   }

  }

}
