import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AuthService } from 'src/app/auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  



  
  constructor(private http: HttpClient, private authService:AuthService) { }

  getPosts(instance:string){
    return this.authService.user.pipe(take(1), exhaustMap(user => {

      const baseUrl = 'http://'+ instance +'.demo.local:8000/';
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      });   

      return this.http.get(baseUrl + 'feed/api/posts/', {headers: headers});

    }));

    
    
  }


}
