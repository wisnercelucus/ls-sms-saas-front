import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService} from './feed.service';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import {NgxLinkifyjsService} from 'ngx-linkifyjs';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  faPlus=faPlus;
  faMinusSquare=faMinusSquare;
  @ViewChild('form') form: ElementRef;

  postsSub:Subscription;
  postCreateSub:Subscription;
  loginUserSub:Subscription;
  pollCreateSub:Subscription;

  pollForm: FormGroup;
  editMode=false;

  loginUser:User;
  username:string;

  selectedFile:File = null;

  constructor(
    private feedService:FeedService, 
    private usersService:UsersService, 
    private router:Router,
    public linkifyService: NgxLinkifyjsService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLogingUser();
  }


  getUserData(username:string){   
    if(username){
      this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
      this.router.navigate(['/accounts', username])
    }
  }


  ngAfterViewInit(){
    if(!this.loginUser){
      this.getLogingUser()
    }
  }

  updateHashLinks(text:string){
      let hashtagRegex = /(^|\s)#([\w\d-]+)/g
      let htmlreplace = text
      let newText = htmlreplace.replace(hashtagRegex, "$1<a href='/feed/tags/$2/'>#$2</a>")
      return newText   
  }

  updateUsernameLinks(text:string){
    let usernameRegex = /(^|\s)@([\w\d-]+)/g
    let htmlreplace = text
    let newText = htmlreplace.replace(usernameRegex, "$1<a style='text-decoration:none' href='/accounts/$2/'>$2</a>")
    return newText   
}

  onSubmitPost(form:NgForm){

    if(!this.selectedFile){
      const r  = this.linkifyService.linkify(form.value.content);

      let newContent = this.updateHashLinks(r);
      newContent = this.updateUsernameLinks(newContent);

      const post:Post = {content:newContent}

      this.postCreateSub = this.feedService.createPost(post).subscribe(
        res=>{
          form.reset();
        }
      );

    }else{
      const fd = new FormData(this.form.nativeElement);
      const r  = this.linkifyService.linkify(fd.get("content").toString())
      const content = this.updateHashLinks(r);

      const newContent = this.updateUsernameLinks(content);

      fd.set("content", newContent);

      fd.append('image', this.selectedFile.name);

      this.postCreateSub = this.feedService.createPost(fd).subscribe(
        res=>{
          form.reset();
        },
        err=>{
          console.log(err)
        }
      );
    }
    
  }

  getLogingUser(){
    this.loginUserSub = this.usersService.loginUser.subscribe(
      user=>{

          this.loginUser = user;
      }
    );
}



  initForm(){
    let question = '';
    let option1 = '';
    let option2 = '';
    let open_until: Date;
    let optionsAdded = new FormArray([])

    this.pollForm = new FormGroup({
      'question': new FormControl(question, Validators.required),
      'option1': new FormControl(option1, Validators.required),
      'option2': new FormControl(option2, Validators.required),
      "open_until": new FormControl(open_until, Validators.required),
      'optionsAdded':optionsAdded
    })

  }

  get controls() {
    return (<FormArray>this.pollForm.get('optionsAdded')).controls;
  }

  onSubmit(){
    this.pollCreateSub = this.feedService.askPollQuestion(this.pollForm.value)
    .subscribe(
      res=>{
        this.pollForm.reset()
      }
    );
  }

  ngOnDestroy(){
    if(this.postsSub){
        this.postsSub.unsubscribe();
    }
    if(this.postCreateSub){
      this.postCreateSub.unsubscribe()
    }
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }
    if(this.pollCreateSub){
      this.pollCreateSub.unsubscribe()
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

  onFileSelected(event:any){
      this.selectedFile = <File>event.target.files[0];
      //console.log(this.selectedFile)
  }

}
