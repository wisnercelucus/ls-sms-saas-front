import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FeedService} from './services/feed.service';

import { faPlus, faMinusSquare} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {NgxLinkifyjsService, Link} from 'ngx-linkifyjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { takeUntil } from 'rxjs/operators';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/services/users.service';

//Soleil leve deux quiosques. DAI will launch appel d'offre. 
//

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  faPlus=faPlus;
  faMinusSquare=faMinusSquare;
  @ViewChild('form') form: ElementRef;
  @ViewChild("textarea") textarea: ElementRef;


  pollForm: FormGroup;
  postForm:FormGroup;
  editMode=false;

  loginUser:User;
  username:string;

  selectedFile:File = null;
  selectedFiles:File[]=[];
  selectedDocs:File[]=[]
  imagePreviewUrl:string;
  imagePreviewUrls:string[]=[];
  destroy$:Subject<void> = new Subject<void>();

  
  constructor(
    private feedService:FeedService, 
    private usersService:UsersService, 
    private router:Router,
    public linkifyService: NgxLinkifyjsService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLogingUser();
    this.initiatePostForm();
  }



  initiatePostForm(){
    this.postForm = new FormGroup({
      content: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }


  getUserData(username:string){   
    if(username){
     // this.postsSub
      this.feedService.getUserPost(this.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
      this.router.navigate(['/accounts', username])
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
    let newText = htmlreplace.replace(usernameRegex, "$1<a style='text-decoration:none' href='/accounts/$2/'>@$2</a>")
    return newText   
}

isEmail(email:string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
  onSubmitPost(form:NgForm){
    let has_image = false;

    if(this.selectedFiles.length == 0 && this.selectedDocs.length == 0){
      const foundLinks: Link[] = this.linkifyService.find(form.value.content);
      let urls: Link[] = [];

      for(let link of foundLinks){
          if(!this.isEmail(link.value)){
              urls.push(link)
          }
      }

      const r  = this.linkifyService.linkify(form.value.content);

      let newContent = this.updateHashLinks(r);
      newContent = this.updateUsernameLinks(newContent);

      const post:any = {content:newContent, has_image:has_image, links:urls}

      //this.postCreateSub = 
     this.feedService.createPost(post)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{
          form.reset();
          this.selectedFiles = []
          this.imagePreviewUrls = []
          this.selectedDocs = []
        }
      );

    }else{
      const fd = new FormData(this.form.nativeElement);

      if(!fd.get("content").toString()){
        return;
      }
      const r  = this.linkifyService.linkify(fd.get("content").toString())
      const content = this.updateHashLinks(r);

      const foundLinks: Link[] = this.linkifyService.find(fd.get("content").toString());
      let urls: Link[] = [];

      if(foundLinks.length >= 1){
        for(let link of foundLinks){
          if(!this.isEmail(link.value)){
              urls.push(link)
          }
        }

        fd.set('links', urls[0].href)
      }

      const newContent = this.updateUsernameLinks(content);

      fd.set("content", newContent);
      
      if(this.selectedFiles.length >= 1){
        for(let f of this.selectedFiles){
          fd.append('image', f.name);
        }   
      }

      

      if(this.selectedDocs.length >= 1){
        for(let doc of this.selectedDocs){
          fd.append("file", doc.name);
        }
      }
      //this.postCreateSub = 
      this.feedService.createPost(fd)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{
          form.reset();
          this.selectedFiles =[];
          this.imagePreviewUrls = [];
          this.selectedDocs = []
        },
        err=>{
          console.log(err)
        }
      );
    }
    
  }

  getLogingUser(){
    this.usersService.loginUser
    .pipe(takeUntil(this.destroy$))
    .subscribe(
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
    this.feedService.askPollQuestion(this.pollForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.pollForm.reset()
      }
    );
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
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
      this.selectedFiles = event.target.files

      for(let i=0; i<this.selectedFiles.length; i++){
        let reader = new FileReader()
        reader.readAsDataURL(this.selectedFiles[i]);
        reader.onload = (e:any)=>{
          this.imagePreviewUrls.push(e.target.result);
        }
      }

  }
  onDocSelected(event:any){
      this.selectedDocs = event.target.files
      //console.log(this.selectedDocs)
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  public onEditorCreated(quill: any) {

    (window as any).mathquill4quill()(quill, {
      displayHistory: true, // defaults to false
      historyCacheKey: '__my_app_math_history_cachekey_', // optional
      historySize: 20, // optional (defaults to 10)
      operators: [["\\sqrt[n]{x}", "\\nthroot"], 
                  ["\\frac{x}{y}","\\frac"], 
                  ["\\ln{x}","\\ln"]]
    });
  }

}
