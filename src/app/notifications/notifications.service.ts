import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';
import {NotificationModel} from './notification.model';



@Injectable({
    providedIn: 'root'
  })
  export class NotificationsService {
    instance:string;
    tenantUrl:string;
    notifications_list: NotificationModel[];
    notifications_list_changed = new EventEmitter();
 
    constructor(private http: HttpClient) { 
  
    }

    getUsersNotification(){
        return this.http.get<NotificationModel[]>(this.tenantUrl + '/notifications/api/all/');
    }
}