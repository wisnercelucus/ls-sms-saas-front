import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';;
import { NgForm, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { ForumsService } from './forums.service';
import { HttpClient } from '@angular/common/http';
import { Topic } from './topic.model';
import { AppService } from '../app.service';


export class UploadAdapter {
  xhr = new XMLHttpRequest();

  constructor( public loader,
    private http?:HttpClient ) {
     this.loader = loader;
  }

  _initRequest() {
    const xhr = this.xhr

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open( 'post', 'http://fdsa.demo.local:8000/forums/api/topics/image/create/', true);

    xhr.setRequestHeader('Authorization', 'Token ' + '76762413b07245198b9cf78dd162929250b91559');
    xhr.responseType = 'json';
    }

    _initListeners( resolve, reject, file ) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${ file.name }.`;

      xhr.addEventListener( 'error', () => reject( genericErrorText ) );
      xhr.addEventListener( 'abort', () => reject() );
      xhr.addEventListener( 'load', () => {
          const response = xhr.response;

          // This example assumes the XHR server's "response" object will come with
          // an "error" which has its own "message" that can be passed to reject()
          // in the upload promise.
          //
          // Your integration may handle upload errors in a different way so make sure
          // it is done properly. The reject() function must be called when the upload fails.
          if ( !response || response.error ) {
              return reject( response && response.error ? response.error.message : genericErrorText );
          }

          // If the upload is successful, resolve the upload promise with an object containing
          // at least the "default" URL, pointing to the image on the server.
          // This URL will be used to display the image in the content. Learn more in the
          // UploadAdapter#upload documentation.
          resolve( {
              default: response.url
          } );
      } );

      // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
      // properties which are used e.g. to display the upload progress bar in the editor
      // user interface.
      if ( xhr.upload ) {
          xhr.upload.addEventListener( 'progress', evt => {
              if ( evt.lengthComputable ) {
                  loader.uploadTotal = evt.total;
                  loader.uploaded = evt.loaded;
              }
          } );
      }
  }


    _sendRequest( file ) {
      // Prepare the form data.
      const data = new FormData();
  
      data.append( 'upload', file );
  
      // Important note: This is the right place to implement security mechanisms
      // like authentication and CSRF protection. For instance, you can use
      // XMLHttpRequest.setRequestHeader() to set the request headers containing
      // the CSRF token generated earlier by your application.
  
      // Send the request.
      this.xhr.send( data );
  }


   upload() {
    return this.loader.file
        .then( file => new Promise( ( resolve, reject ) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        } ) );
    }
  
    // Aborts the upload process.
      abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
      }
}



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  config:any;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = [];
  //loginUserSub:Subscription;
  destroy$:Subject<void> = new Subject<void>();
  loginUser:User;
  htmlContent:string;
  topicList:Topic[];
  tenantUrl:string;

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private usersService:UsersService,
    private forumsService:ForumsService,
    private appSerive:AppService
    ) {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));


    this.config = {
      placeholder: 'Type your topic',
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ]
      },
      image: {
        toolbar: [
          'imageStyle:full',
          'imageStyle:side',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en'
    };
   }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    /*
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }*/
    
  }

  ngOnInit(): void {
    this.getLogingUser();
    this.getCategories();
    this.getTopics();

    this.forumsService.refreshneeded
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      ()=>{
        this.getTopics();
      }
    )
  }

  getCategories(){
    this.forumsService.getForumsCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe(categories=>{
      for(let cat of categories){
          this.allCategories.push(cat.title)
      }
    })
  }


  getTopics(){
    this.forumsService.getTopics()
    .pipe(takeUntil(this.destroy$))
    .subscribe( topics =>{
      this.topicList = topics;
    }
    )
  }



  getLogingUser(){
    //this.loginUserSub = 
    this.usersService.loginUser
    .pipe(takeUntil(this.destroy$))
    .subscribe (
      user=>{
          this.loginUser = user;
      }
    );
}


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.categories.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }



  onSubmitPost(f:NgForm){
    const data = {topic:f.value, categories:this.categories}   
    this.forumsService.createTopic(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      f.resetForm()
      this.categories = []
    })
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
