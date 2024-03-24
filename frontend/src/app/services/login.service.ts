import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
  
    private baseUrl = 'http://localhost:5000'; // Replace with your Flask backend URL

    constructor(private http: HttpClient) { }

    //loginWithStrava(): Observable<any> {
    //    return this.http.get<any>(`${this.baseUrl}/auth/login`);
   // }
}