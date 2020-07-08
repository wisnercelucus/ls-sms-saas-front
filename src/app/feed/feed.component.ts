import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { FeedService} from './feed.service';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  faPlus=faPlus;
  faMinusSquare=faMinusSquare;


  instanceSub: Subscription;
  userSubs: Subscription;
  postsSub:Subscription;
  postCreateSub:Subscription;
  pollForm: FormGroup;
  editMode=false;
  loginUserSub:Subscription;
  loginUser:User;

  constructor(
    private feedService:FeedService, private usersService:UsersService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLogingUser();
  }

  ngAfterViewInit(){
  }

  onSubmitPost(form:NgForm){
    const post:Post = {content:form.value.content}
    this.postCreateSub = this.feedService.createPost(post).subscribe(
      res=>{
        form.reset();
      }
    );
  }

  getLogingUser(){
    this.loginUserSub = this.usersService.getMyProfile().subscribe(
      user=>{
        if(user){
          this.loginUser = new User(user['username'],
                          user['email'], 
                          user['image'],
                          user['is_staff'],
                          user['is_superuser'],
                          user['last_name'],
                          user['id'],
                          user['first_name']);
        }

      }
    );
}



  initForm(){
    let question = '';
    let option1 = '';
    let option2 = '';
    let optionsAdded = new FormArray([])

    this.pollForm = new FormGroup({
      'question': new FormControl(question, Validators.required),
      'option1': new FormControl(option1, Validators.required),
      'option2': new FormControl(option2, Validators.required),
      'optionsAdded':optionsAdded
    })

  }

  get controls() {
    return (<FormArray>this.pollForm.get('optionsAdded')).controls;
  }

  onSubmit(){
    console.log(this.pollForm.value)
    
  }

  ngOnDestroy(){
    if(this.postsSub){
        this.postsSub.unsubscribe();
    }
    if(this.postCreateSub){
      this.postCreateSub.unsubscribe()
    }
  }

  onAddOption(){
    (<FormArray>this.pollForm.get('optionsAdded')).push(
      new FormGroup({
        'option': new FormControl(null, Validators.required)
      })
    )
  }

  onRemoveOption(index:number){
    (<FormArray>this.pollForm.get('optionsAdded')).removeAt(index);
  }

}
