import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CountriesService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  maxDate: Date;
  schoolSizes = []
  countries;
  @ViewChild('f') shListForm: NgForm;


  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 1)
    this.schoolSizes =[
      { value: 'small', name: 'less than 100 students'},
      { value: 'medium', name: '101 to 500 students'},
      { value: 'wide', name: '501 to 1000 students'},
      { value: 'very-wide', name: '1001+ students'}
    ];
    this.subscription = this.countriesService.getCountriesAPI().subscribe(
      countriesApi => {
        this.countries = countriesApi;
      }
    );
    
  }

  onSubmit(form: NgForm){
    console.log(form.value)

  }
  onClear(){
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
