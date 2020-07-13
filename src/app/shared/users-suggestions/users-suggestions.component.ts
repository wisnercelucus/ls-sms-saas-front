import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-users-suggestions',
  templateUrl: './users-suggestions.component.html',
  styleUrls: ['./users-suggestions.component.css']
})
export class UsersSuggestionsComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }

}
