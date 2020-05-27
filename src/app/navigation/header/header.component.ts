import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth=false;
  subscription: Subscription;
  constructor() { }

  ngOnInit(): void {

    
  }

  onToggleSiveNav(){
    this.sideNavToggle.emit()

  }

  onLogout(){

  }

}
