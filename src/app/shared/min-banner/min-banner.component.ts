import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-min-banner',
  templateUrl: './min-banner.component.html',
  styleUrls: ['./min-banner.component.css']
})
export class MinBannerComponent implements OnInit {
  @Input() bannerText: {p:string, btn:string};

  onDonatePage = false;
  onResetPassword = false;
  constructor() {
   }

  ngOnInit(): void {

  }


}
