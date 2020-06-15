import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonateService } from '../donate.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-process-donation',
  templateUrl: './process-donation.component.html',
  styleUrls: ['./process-donation.component.css']
})
export class ProcessDonationComponent implements OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  @ViewChild('f') donateForm: ElementRef;
   card: any;
   cardHandler = this.onChange.bind(this);
   cardError: string;
   amountOptions = []
   subscription: Subscription;
   constructor( private cd: ChangeDetectorRef, 
                   private donateService: DonateService,
                   private snackBar: MatSnackBar ) {}

   donationObject = []
   
   custumAmountIsSelected = true;
   isLoading = false;
   successMessage = '';
   errorMessage = '';

   onSelectionChanged({value}) {
       if(value === 'custom') {
           this.custumAmountIsSelected = false;
       } else {
           this.custumAmountIsSelected = true;
       }
     }


 ngOnInit(): void {
   this.amountOptions =[
     {'value': '10', 'name': '$10 -- Good'},
     {'value': '25', 'name': '$25 -- Great'},
     {'value': '45', 'name': '$45 -- Amazing'},
     {'value': 'custom', 'name': 'Custom amount'},
   ]
 }
   ngOnDestroy() {
           if (this.card) {
               // We remove event listener here to keep memory clean
               this.card.removeEventListener('change', this.cardHandler);
               this.card.destroy();  
           }
           if(this.subscription){
               this.subscription.unsubscribe();
           }

           
       }
   ngAfterViewInit() {
           this.initiateCardElement();
       }

   initiateCardElement() {
           // Giving a base style here, but most of the style is in scss file
           const cardStyle = {
               base: {
                   width:'100%',
                   color: '#32325d',
                   fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                   fontSmoothing: 'antialiased',
                   fontSize: '16px',
                   '::placeholder': {
                       color: '#aab7c4',
                   },
               },
               invalid: {
                   color: '#fa755a',
                   iconColor: '#fa755a',
               },
           };
           this.card = elements.create('card', {cardStyle});
           this.card.mount(this.cardInfo.nativeElement);
   this.card.addEventListener('change', this.cardHandler);
       }

   onChange({error}) {
           if (error) {
               this.cardError = error.message;
           } else {
               this.cardError = null;
           }
           this.cd.detectChanges();
       }

   async createStripeToken(form: NgForm) {
           this.isLoading = true;
           const {token, error} = await stripe.createToken(this.card);
           if (token) {
               this.onSuccess(token, form);
           } else {
               this.onError(error);
           }
       }

   onSuccess(token, form: NgForm) {

       if(!form.valid){
           return;
       }

       this.donationObject = [
           {'stripeToken': token},
           {'donor': form.value}
       ]
       this.isLoading = true;
       this.subscription = this.donateService.chargeCarte(this.donationObject).subscribe(
           resp =>{
             this.errorMessage = ''
             this.successMessage = resp['message'];
             this.isLoading = false;
             this.snackBar.open(this.successMessage, 'Close', {
               duration: 5000
               });

             form.resetForm();
             this.card.destroy()
             this.initiateCardElement()
           },
           err => {
             this.successMessage = ''
             this.errorMessage = err.error.message;
             this.isLoading = false;
           }
         );
   }

   onError(error) {
     if (error.message) {
         this.cardError = error.message;
     }
   }

   /*  Alert Dialog Controle   */

   onHandleError(){
       this.errorMessage ="";
   }

   onHandleSuccess(){
       this.successMessage="";
   }

}
