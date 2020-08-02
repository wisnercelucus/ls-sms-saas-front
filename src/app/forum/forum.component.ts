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
import { HttpParams, HttpClient } from '@angular/common/http';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


export class UploadAdapter {
  constructor( public loader, private http?:HttpClient ) {
     this.loader = loader;
     this.http = http;
  }

  //the uploadFile method use to upload image to your server
  uploadFile(file,url?:string){
    let http: HttpClient;
    let name = '';
    let formData:FormData = new FormData();
    let headers = new Headers();
    name = file.name;
    formData.append('image', file, name);
    const dotIndex = name.lastIndexOf('.');
    const fileName  = dotIndex>0?name.substring(0,dotIndex):name;
    formData.append('name', fileName);
  
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log('formData',formData);
    let params = new HttpParams();
    const options = {
        params: params,
        reportProgress: true,
    };
  //http post return an observer
  //so I need to convert to Promise
    return http.post(url,formData,options);
  }

/*
  
  upload() {
      let upload = new Promise((resolve, reject)=>{
        this.loader['file'].then(
            (data)=>{
                this.uploadFile(data,
                  'http://fdsa.demo.local:8000/forums/topics/image/create/')
                .subscribe(
                    (result)=>{
                      //resolve data formate must like this
                      //if **default** is missing, you will get an error
                        resolve({ default: result['image'] })
                    },
                    (error)=>{
                        reject(data.msg);
                    }
                );
            }
        );
      });
      return upload;
  }
  */


/*
  upload() {
     return this.loader.file
           .then( file => new Promise( ( resolve, reject ) => {
                 var myReader= new FileReader();
                 myReader.onloadend = (e) => {
                    resolve({ default: myReader.result });
                 }
                 myReader.readAsDataURL(file);
           } ) );
  };
*/
  abort() {
    console.log("abort")
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

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private usersService:UsersService,
    private forumsService:ForumsService,
    private http:HttpClient
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
      console.log(res);
    })
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }

  public onChange( $event: ChangeEvent  ) {
    //console.log($event.editor)
  }

}
