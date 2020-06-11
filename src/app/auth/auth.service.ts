import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

export class Client{
  name: string;
  short: string;
  contact_email: string;
  contact_fisrt_name: string;
  contact_last_name: string;
  contact_phone: string;
  country: string;
  school_size:string;
  paid_until?:Date;
  on_trial?: boolean;
  created_on?: Date;

  constructor(fullName:string, short:string, contactEmail:string, 
              contactFirstName:string, contactLastName:string,
              contactPhone:string, country:string, schoolSize:string, 
              paidUntil?:Date, onTrial?:boolean, createdOn?:Date
              ){
    this.name = fullName;
    this.short = short;
    this.contact_email = contactEmail;
    this.contact_fisrt_name = contactFirstName;
    this.contact_last_name = contactLastName;
    this.contact_phone = contactPhone;
    this.country = country;
    this.school_size = schoolSize;
    this.paid_until = paidUntil;
    this.on_trial = onTrial;

  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscrition: Subscription;
  baseUrl = 'http://demo.local:8000/prospect/api/register/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }



  registerClient(client: Client){
    const body = JSON.stringify(client);
    this.http.post(this.baseUrl, body, {headers: this.headers}).subscribe(
      resp =>{
        console.log(resp);
      }
    );

  }


}

