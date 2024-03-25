import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heartRateSummaryData: any;
    effortSummaryData: any;
    authService: AuthService;
  
    accessToken: string | null = null;
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {

    }

}