// heart-rate-summary.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeartRateService } from '../../services/heart-rate.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';


@Component({
  selector: 'heart-rate-summary',
  templateUrl: './heart-rate-summary.component.html',
  styleUrls: ['./heart-rate-summary.component.css']
})

export class HeartRateSummaryComponent {
  @ViewChild('heartRateChart') heartRateChart: ElementRef;
    
    selectedDays: number = 7; // Default value for number of days
    showChart: boolean = false;
    showSpinner: boolean = false;
    heartRateSummaryData: any = {};

  constructor(private heartRateService: HeartRateService) { }
  
  ngAfterViewInit(): void {
  }

  generateSummary(): void {
    
    this.showSpinner = true;

    this.heartRateService.getHeartRateZoneSummary(this.selectedDays).subscribe(data => {
      this.showChart = true;

      setTimeout(()=>{                           
        this.renderChart(data);
        this.showSpinner = false;
      }, 250);

    },
    error => {
      console.error('Error fetching heart rate summary:', error);
      this.showSpinner = false; // Hide spinner in case of error
    });
  }

  renderChart(data: any): void {
    if (!this.heartRateChart || !this.heartRateChart.nativeElement) {
        console.error("heartRateChart is not initialized");
        return;
    }

    const ctx = this.heartRateChart.nativeElement.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, this.heartRateChart.nativeElement.width, this.heartRateChart.nativeElement.height);

    const labels = Object.keys(data);
    const graphData = Object.values(data) as number[] ;

    const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Heart Rate Zone Summary',
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, chartConfig);
}

}