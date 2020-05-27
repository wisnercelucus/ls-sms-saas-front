import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CountriesService {
    constructor(private _http: HttpClient) {
    }
    
    public getCountryDetail(countryName: string): any  {
        let _url: string = 'https://restcountries.eu/rest/v2/name/'+countryName+'?fullText=true'; 
        return this._http.get( _url ).subscribe();
    }

    public getCountriesAPI() {
      let _url: string = 'https://restcountries.eu/rest/v2/all'; 
      return this._http.get( _url )
    }
}