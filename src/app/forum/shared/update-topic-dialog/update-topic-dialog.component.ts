import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ForumsService } from '../../services/forums.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/users/models/user.model';
import { Topic } from '../../models/topic.model';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { FormControl, NgForm } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UsersService } from 'src/app/users/services/users.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


interface DialogData{
  topic?:Topic;
  loginUser?: User;
  atPostDetail?:boolean;
}

@Component({
  selector: 'app-update-topic-dialog',
  templateUrl: './update-topic-dialog.component.html',
  styleUrls: ['./update-topic-dialog.component.css']
})
export class UpdateTopicDialogComponent implements OnInit, OnDestroy {
  loginUser:User;
  atTopicDetail:boolean;
  topic:Topic;
  destroy$:Subject<void> = new Subject<void>();

  visible = true;
  selectable = true;
  removable = true;
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = [];
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<UpdateTopicDialogComponent>,
    private forumsService:ForumsService,
    private usersService:UsersService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router:Router) {
        this.loginUser = data['loginUser'];
        this.atTopicDetail = data['atTopicDetail'];
        this.topic = data['topic'];
        
        for(let c of this.topic.categories){
          this.categories.push(c.title)
        }

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

    //this.getTopics();

    this.forumsService.refreshneeded.pipe(takeUntil(this.destroy$)).subscribe(
      res=>{
        //this.getTopicsOncreate();
      }
    )
  }




  getCategories(){
    this.forumsService.getForumsCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      categories=>{
        for(let cat of categories){
          this.allCategories.push(cat.title);
      }
      }
    )
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

    this.forumsService.updateTopic(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      this.dialogRef.close();
      f.resetForm();
      this.categories = [];
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
