import { CadenceService } from './../../services/cadence.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { formatDate } from '@angular/common'; // Import formatDate function


@Component({
  selector: 'cadence-summary',
  templateUrl: './cadence-summary.component.html',
  styleUrls: ['./cadence-summary.component.css']
})

export class CadenceSummaryComponent {
  @ViewChild('cadenceChart') cadenceChart: ElementRef;

  showChart: boolean = false;
  showSpinner: boolean = false;
  cadenceSummaryData: any = {};
  selectedDays: number = 7; 
  chartInstance: Chart;

  constructor(private cadenceService : CadenceService) {}
    
  ngAfterViewInit(): void {
  }

  generateSummary(): void {
    
    this.showSpinner = true;
    this.cadenceService.getCadenceSummary(this.selectedDays).subscribe(data => {
      
      this.showChart = true;
      setTimeout(()=>{                           
        this.renderChart(data);
        this.showSpinner = false;
      }, 250);
    },
    error => {
      console.error('Error fetching cadence summary:', error);
      this.showSpinner = false; // Hide spinner in case of error
    });
  }


  renderChart(data: any): void {
    if (!this.cadenceChart || !this.cadenceChart.nativeElement) {
        console.error("heartRateChart is not initialized");
        return;
    }

    const ctx = this.cadenceChart.nativeElement.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, this.cadenceChart.nativeElement.width, this.cadenceChart.nativeElement.height);
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
          label: 'Average Cadence',
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