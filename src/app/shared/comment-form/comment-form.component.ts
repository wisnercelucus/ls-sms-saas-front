import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/feed/models/post.model';
import { User } from 'src/app/users/models/user.model';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() post:Post;
  @Input() loginUser:User;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleCommentForm(id:string){
    let element = document.getElementById(id);
    element.classList.remove('hide')
    element.classList.add("fadeIn")
  }


}
