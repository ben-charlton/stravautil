// heart-rate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/dev';

@Injectable({
  providedIn: 'root'
})

export class HeartRateService {
  
  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) { }

  getHeartRateZoneSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/heart-rate-summary`);
  }
}