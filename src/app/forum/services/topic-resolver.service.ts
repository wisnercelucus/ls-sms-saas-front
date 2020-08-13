import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Topic } from '../models/topic.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ForumsService } from './forums.service';

@Injectable({providedIn:'root'})
export class TopicResolver implements Resolve<Topic[]>{
    constructor(private forumsService:ForumsService
        ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Topic[] | Observable<Topic[]> | Promise<Topic[]> {
        return this.forumsService.getTopics();
    }
    

}