import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonateService } from './donate.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
    constructor(){}
    
    ngOnInit(){

    }
}
