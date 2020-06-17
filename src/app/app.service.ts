import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class AppService{
    instance: string;
    BASE_DOMAIN = 'demo.local';
    PROTOCOL="http://"
    PROTOCOLS="https://"
    API_PORT="8000"
    FRONT_PORT="4200"

    TENANT_URL:string;

    constructor(){
    }

}