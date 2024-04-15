import { Component, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeartRateSummaryComponent } from '../heart-rate-summary/heart-rate-summary.component';
import { CadenceSummaryComponent } from '../cadence-summary/cadence-summary.component';
import { DistanceSummaryComponent } from '../distance-summary/distance-summary.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements AfterViewInit {
  @ViewChildren(HeartRateSummaryComponent) heartRateSummaryComponents: QueryList<HeartRateSummaryComponent>;
  @ViewChildren(CadenceSummaryComponent) cadenceSummaryComponents: QueryList<CadenceSummaryComponent>;
  @ViewChildren(DistanceSummaryComponent) distanceSummaryComponents: QueryList<DistanceSummaryComponent>;

    selectedDays: number = 7; // Initialize selectedDays with a default value


    constructor(private route: ActivatedRoute, private router: Router) {}
  
    ngAfterViewInit(): void { 
      
      this.generateSummaries(); }

    generateSummaries(): void {
      this.heartRateSummaryComponents.forEach(component => component.generateSummary());
      this.cadenceSummaryComponents.forEach(component => component.generateSummary());
      this.distanceSummaryComponents.forEach(component => component.generateSummary());

    }

}
