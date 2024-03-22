import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heartRateSummaryData: any;
    effortSummaryData: any;
  
    constructor() { }
  
    ngOnInit(): void {
      // Data fetching logic removed
    }

}