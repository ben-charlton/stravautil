// heart-rate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/dev';

@Injectable({
  providedIn: 'root'
})

export class HeartRateService {
  
  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) { }

  getHeartRateZoneSummary(days: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/heart/heart-rate-summary?days=${days}`, { headers });
  }
}