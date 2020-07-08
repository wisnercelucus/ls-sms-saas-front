import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

    TENANT_URL = new BehaviorSubject<string>(null);

    constructor(){
        
    }

    setTenantUrl(url){
        this.TENANT_URL.next(url);
    }

}