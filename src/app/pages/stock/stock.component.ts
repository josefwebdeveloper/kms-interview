import {Component, OnInit} from '@angular/core';
import {StockData, TYPE} from '../../_model/stock-data';
import {ActivatedRoute, Router} from '@angular/router';
import {StockService} from '../../_services/stock.service';
import {map} from 'rxjs/operators';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  chartLabels = [];
  spinner = true;
  chartData = [];
  data$: Observable<any> | Observable<StockData>;
  chartOptions = {
    responsive: true
  };
  dataLabels = [];
  dataChart = [
    {data: [], label: TYPE['1. open']},
    {data: [], label: TYPE['2. high']},
    {data: [], label: TYPE['3. low']},
    {data: [], label: TYPE['4. close']},
    {data: [], label: TYPE['5. volume']},

  ];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private stockService: StockService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.setDataForChart(params);
    });
  }

  setDataForChart(params) {
    this.spinner=true
    this.data$ = this.stockService.getHttp({function: 'TIME_SERIES_DAILY', symbol: params.id})
      .pipe(map(d => {
          if (d) {
            for (const key in d['Time Series (Daily)']) {
              if (d['Time Series (Daily)'].hasOwnProperty(key)) {
                this.dataLabels.push(key);
                this.dataChart = [
                  {data: [...this.dataChart[0].data, d['Time Series (Daily)'][key]['1. open']], label: TYPE['1. open']},
                  {data: [...this.dataChart[1].data, d['Time Series (Daily)'][key]['2. high']], label: TYPE['2. high']},
                  {data: [...this.dataChart[2].data, d['Time Series (Daily)'][key]['3. low']], label: TYPE['3. low']},
                  {
                    data: [...this.dataChart[3].data, d['Time Series (Daily)'][key]['4. close']],
                    label: TYPE['4. close']
                  },
                ];
              }
            }
          }
          this.chartData = this.dataChart;
          this.chartLabels = this.dataLabels;
          this.spinner = false;
          return d;
        })
      );
  }

  onChartClick(event) {
  }

}
