import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonateService } from './donate.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @ViewChild('f') donateForm: ElementRef;
    _totalAmount: number;
        card: any;
        cardHandler = this.onChange.bind(this);
        cardError: string;
        amountOptions = []
    constructor( private cd: ChangeDetectorRef, 
                 private donateService: DonateService ) {
            
        }

  ngOnInit(): void {

    this._totalAmount = 45;
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
            const {token, error} = await stripe.createToken(this.card);
            if (token) {
                this.onSuccess(token, form);
            } else {
                this.onError(error);
            }
        }

    onSuccess(token, form: NgForm) {
      this.donateService.chargeCarte();
    }

    onError(error) {
      if (error.message) {
          this.cardError = error.message;
      }
    }

}
