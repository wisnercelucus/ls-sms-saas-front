import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-users-suggestions',
  templateUrl: './users-suggestions.component.html',
  styleUrls: ['./users-suggestions.component.css']
})
export class UsersSuggestionsComponent implements OnInit {
  usersList="";
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }

}
