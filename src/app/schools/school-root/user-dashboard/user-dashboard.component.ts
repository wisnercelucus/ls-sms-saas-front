import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/users/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  
  @Input() loginUser:User;

  constructor() { }

  ngOnInit(): void {
  }

}
