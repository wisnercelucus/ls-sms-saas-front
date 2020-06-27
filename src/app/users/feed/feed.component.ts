import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { FeedService } from './feed.service';
import { AppService } from 'src/app/app.service';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


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
  pollForm: FormGroup;
  editMode=false;

  constructor(private authService: AuthService, 
    private feedService:FeedService,
    private appService:AppService
    ) { }

  ngOnInit(): void {
    this.initForm();
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

  getPosts(instance:string){
    
  }
  

  ngOnDestroy(){

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
