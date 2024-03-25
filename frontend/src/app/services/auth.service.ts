import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Import the map operator
import { environment } from 'src/environments/dev';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private clientId = '121489';
    private clientSecret = environment.clientSecret;
    private tokenUrl = 'https://www.strava.com/oauth/token';

    constructor(private http: HttpClient) {}

    login(): Observable<string> {
        window.location.href = 'https://www.strava.com/oauth/authorize?client_id=121489&redirect_uri=http://localhost:4200/callback&response_type=code&scope=read,activity:read_all';
        return new Observable<string>();
    } 

    isLoggedIn(): boolean {
        return !!localStorage.getItem('accessToken');
    }
      
      handleOAuthCallback(code: string): Observable<any>  {

        const payload = {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          grant_type: 'authorization_code'
        };
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
    
        return this.http.post<any>(this.tokenUrl, payload, { headers: headers }).pipe(
            catchError(error => {
              // Handle any errors that occur during the HTTP request
              console.error('Error exchanging authorization code for access token:', error);
              return throwError(error);
            })
          );
        }

  }