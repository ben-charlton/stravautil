// heart-rate-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { HeartRateService } from './heart-rate.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-heart-rate-summary',
  templateUrl: './heart-rate-summary.component.html',
  styleUrls: ['./heart-rate-summary.component.css']
})

export class HeartRateSummaryComponent implements OnInit {
    @ViewChild('heartRateChart') heartRateChart: ElementRef;

    heartRateSummaryData: any = {};

  constructor(private heartRateService: HeartRateService) { }

  ngOnInit(): void {
    this.heartRateService.getHeartRateZoneSummary().subscribe(data => {
      this.heartRateSummaryData = data;
      this.renderChart();
    });
  }

  renderChart(): void {
    const ctx = this.heartRateChart.nativeElement.getContext('2d');

    const labels = Object.keys(this.heartRateSummaryData);
    const data = Object.values(this.heartRateSummaryData);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Heart Rate Zone Summary',
          data: data,
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
    });
  }
}