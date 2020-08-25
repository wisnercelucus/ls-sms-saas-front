import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NotificationModel} from './notification.model';
import { tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
  })
  export class NotificationsService {
    instance:string;
    tenantUrl:string;
    notifications_list: NotificationModel[];
 
    constructor(private http: HttpClient) { 
  
    }

    getUsersNotification(){
        return this.http.get<NotificationModel[]>(this.tenantUrl + '/notifications/api/all/').pipe(
          tap(res=>{
          })
        );
    }
}