import { DistanceService } from './../../services/distance.service';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { formatDate } from '@angular/common'; // Import formatDate function


@Component({
  selector: 'distance-summary',
  templateUrl: './distance-summary.component.html',
  styleUrls: ['./distance-summary.component.css']
})

export class DistanceSummaryComponent {
  @ViewChild('distanceChart') distanceChart: ElementRef;
  @Input() selectedDays: number = 7; // Default value for number of days
  @Output() summaryGenerated: EventEmitter<void> = new EventEmitter<void>();

  showChart: boolean = false;
  showSpinner: boolean = false;
  chartInstance: Chart;

  constructor(private distanceService : DistanceService) {}
    
  ngAfterViewInit(): void {
  }

  generateSummary(): void {
    
    this.showSpinner = true;
    console.log('-----generating summary--------')
    this.distanceService.getDistanceSummary(this.selectedDays).subscribe(data => {
    console.log('-----getting summary--------')

      this.showChart = true;
      setTimeout(()=>{          
        console.log('-----rendering--------')                 
        this.renderChart(data);
        this.showSpinner = false;
      }, 250);
    },
    error => {
      console.error('Error fetching distance summary:', error);
      this.showSpinner = false; // Hide spinner in case of error
    });
    this.summaryGenerated.emit();
  }


  renderChart(data: any): void {
    if (!this.distanceChart || !this.distanceChart.nativeElement) {
        console.error("distanceChart is not initialized");
        return;
    }

    const ctx = this.distanceChart.nativeElement.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, this.distanceChart.nativeElement.width, this.distanceChart.nativeElement.height);
     // Destroy existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = Object.keys(data)
    const graphData = Object.values(data) as number[];

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Distance Covered',
          data: graphData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }/*,
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'DD-MM-YYYY', // Specify the format of your data keys
              unit: 'day',
              tooltipFormat: 'DD-MM-YYYY',
            },
            ticks: {
              maxTicksLimit: 7, // Adjust as needed
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      }*/
    }
    this.chartInstance = new Chart(ctx, chartConfig);
}

}