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
  
  
  donationsObject = [ 
                      {'donor': {'full_name': 'Wisner', 'email':'wisnercelicus@gmail.com'}},
                      {'card': 'card object'}
                    ]

  

  constructor(private http: HttpClient) { }
  
  chargeCarte(){
   const body = JSON.stringify(this.donationsObject);
   this.http.post(this.baseUrl, body, {headers: this.headers}).subscribe();
  }

}
