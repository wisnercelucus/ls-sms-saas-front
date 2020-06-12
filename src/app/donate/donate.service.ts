import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  baseUrl = 'http://demo.local:8000/donate/api/charge/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  
  constructor(private http: HttpClient) { }
  
  chargeCarte(donationObject:any){
   const body = JSON.stringify(donationObject);
   return this.http.post(this.baseUrl, body, {headers: this.headers})
  }

}
