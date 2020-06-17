import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AppService{
    instance = new  BehaviorSubject<string>(null);
    BASE_DOMAIN = 'demo.local';
    
    setInstance(instanceName:string){
        this.instance.next(instanceName);
    }

}