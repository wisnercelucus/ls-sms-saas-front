import { Component, OnDestroy, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from 'src/app/users/users.service';
import { Subscription } from 'rxjs';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import {NgxLinkifyjsService, Link, LinkType} from 'ngx-linkifyjs';
import { FeedService } from 'src/app/feed/feed.service';
import { User } from 'src/app/users/user.model';
import { Post } from 'src/app/feed/post.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppService } from 'src/app/app.service';

interface DialogData{
  postToEdit:Post;
  editMode_:boolean;
}

@Component({
  selector: 'app-publish-modal-form',
  templateUrl: './publish-modal-form.component.html',
  styleUrls: ['./publish-modal-form.component.css']
})
export class PublishModalFormComponent implements OnInit, OnDestroy{
  faPlus=faPlus;
  faMinusSquare=faMinusSquare;
  @ViewChild('form') form: ElementRef;
  
  username:string;

  postCreateSub:Subscription;
  loginUserSub:Subscription;
  pollCreateSub:Subscription;
  postUpdateSub:Subscription;
  updatePollSub:Subscription;
  tenanTUrlSub:Subscription;

  pollForm: FormGroup;
  editMode=false;
  postToEdit:Post;

  loginUser:User;

  selectedFile:File = null;
  selectedFiles:File[] = [];
  selectedDocs:File[] = [];
  editMode_:boolean;

  imagePreviewUrl:string;
  imagePreviewUrls:string[] =[];
  tenantUrl:string;
  

  constructor(
    public dialogRef: MatDialogRef<PublishModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private feedService:FeedService, 
    private usersService:UsersService, 
    public linkifyService: NgxLinkifyjsService,
    private appService:AppService
    ) { 
      this.postToEdit = this.data['post'];
      this.editMode_ = this.data['editMode_'];
    }

  ngOnInit(): void {
    this.initForm();
    this.getLogingUser();
    this.tenanTUrlSub = this.appService.TENANT_URL.subscribe(
      res=>{
        this.tenantUrl = res;
      }
    )
  }


  onNoClick(): void {
    this.dialogRef.close();
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

      this.postCreateSub = this.feedService.createPost(post).subscribe(
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
      
      this.postCreateSub = this.feedService.createPost(fd).subscribe(
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
        this.dialogRef.close()
      }
    );
  }

  ngOnDestroy(){
      if(this.postCreateSub){
        this.postCreateSub.unsubscribe()
      }
      if(this.loginUserSub){
        this.loginUserSub.unsubscribe();
      }
      if(this.pollCreateSub){
        this.pollCreateSub.unsubscribe()
      }
      if(this.postUpdateSub){
        this.postUpdateSub.unsubscribe()   
      }
      if(this.updatePollSub){
        this.updatePollSub.unsubscribe()  
      }
      if(this.tenanTUrlSub){
        this.tenanTUrlSub.unsubscribe();
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

  closeDialog(){
    this.dialogRef.close()
  }

  onEditPost(form:NgForm) {
    if(this.selectedFiles.length == 0){
      let r: string;
      let newC:boolean;

      if(form.value['content']){
        r  = this.linkifyService.linkify(form.value.content);
        newC = false
      }

      if(form.value['new_content']){
        r  = this.linkifyService.linkify(form.value.new_content);
        newC = true
      }

      let post_id = form.value.post_id

      let newContent = this.updateHashLinks(r);
      newContent = this.updateUsernameLinks(newContent);

      const post:any = {content:newContent, has_new_content: newC, post_id:post_id, has_no_picture:true}

      this.postUpdateSub = this.feedService.updatePost(post, post_id).subscribe(
        res=>{
          this.selectedFiles = []
          this.dialogRef.close()
        }
      );

    }else{
      const fd = new FormData(this.form.nativeElement);
      const r  = this.linkifyService.linkify(fd.get("content").toString())
      const content = this.updateHashLinks(r);

      const newContent = this.updateUsernameLinks(content);

      fd.set("content", newContent);

      for(let file of this.selectedFiles){
        fd.append('image', file.name);
      }

      this.postUpdateSub = this.feedService.updatePost(fd,  +fd.get("post_id")).subscribe(
        res=>{
          form.reset();
          this.dialogRef.close()
          this.selectedFiles = []
        },
        err=>{
          console.log(err)
        }
      );
    }
  }

  onUpdatePoll(fp:NgForm){

      this.updatePollSub = this.feedService.updatePollQuestion(fp.value).subscribe(
        res=>{
          fp.reset()
          this.dialogRef.close()
        },
        err=>{
          //
        }
      )
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

}
