import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';;
import { NgForm, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { Topic } from './models/topic.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ForumActions from './store/forum.actions';
import { ActivatedRoute } from '@angular/router';

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
  destroy$:Subject<void> = new Subject<void>();
  loginUser:User;
  htmlContent:string;
  topicList:Topic[];
  tenantUrl:string;
  unOrderedTopics: Topic[];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  panelOpenState = false;


  constructor(private usersService:UsersService,
    private store:Store<fromApp.AppState>,
    private route: ActivatedRoute

    ) {
      this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));

   }

    ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
      
    }

  ngOnInit(): void {
    this.getLogingUser();
    this.getCategories();
    this.setTopics();
    this.setCategories();
  }


  setCategories(){
    this.store.select('forum')
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      forumState=>{
        let categories = forumState.categories;
        for(let cat of categories){
          this.allCategories.push(cat.title);
      }
      }
    )
  }


  getCategories(){
    this.store.dispatch(new ForumActions.FetchCategories());
  }


  getTopics(){
    this.store.dispatch(new ForumActions.FetchTopics());
  }

  setTopics(){
    this.store.select('forum')
    .pipe(takeUntil(this.destroy$))
    .subscribe(forumSate=>{
      if(forumSate){
        const topic_entities = forumSate.topic_entities
        this.topicList = this.sortByDate(Object.keys(topic_entities).map(id=> 
          topic_entities[parseInt(id, 10)]
        ));
      }
    })
  }

  private getTime(date: Date) {
    return new Date(date).getTime()
  }


  public sortByDate(arr:Topic[]):any {
      return arr.sort((a: Topic, b: Topic) => {
          return this.getTime(b.date) - this.getTime(a.date);
      });
  }

  getLogingUser(){
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
    if(this.categories.length == 0){
      return;
    }

    if(f.value['content'] == ""){
      return;
    }
    
    if(f.value['title'] == ""){
      return;
    }

    const data = {topic:f.value, categories:this.categories}   
    this.store.dispatch(new ForumActions.CreateTopic(data));
    f.resetForm();
    this.categories = [];
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
