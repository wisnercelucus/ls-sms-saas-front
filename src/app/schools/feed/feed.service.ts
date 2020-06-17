import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  
  constructor(private http: HttpClient, private authService:AuthService) { }

  getPosts(instance:string){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const baseUrl = 'http://'+ instance +'.demo.local:8000/';
      return this.http.get(baseUrl + 'feed/api/posts/', {headers: headers});
    }
}

