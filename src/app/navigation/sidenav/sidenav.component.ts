import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth=false;
  authSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  onCloseSideNav(){
    this.sideNavClose.emit()
  }
  
  onLogout(){
    this.onCloseSideNav()
  }

}

