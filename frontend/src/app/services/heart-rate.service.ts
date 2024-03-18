// heart-rate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeartRateService {
  private apiUrl = 'YOUR_FLASK_BACKEND_API_URL';

  constructor(private http: HttpClient) { }

  getHeartRateZoneSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/heart-rate-summary`);
  }
}