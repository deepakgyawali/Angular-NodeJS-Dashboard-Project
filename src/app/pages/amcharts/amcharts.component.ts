import { Component, OnInit } from '@angular/core';
import { McompService } from './amcharts.service';

// import js scripts for am charts
import 'amcharts3/amcharts/amcharts.js';
import 'amcharts3/amcharts/serial.js';
import 'amcharts3/amcharts/gauge.js';
import 'amcharts3/amcharts/pie.js';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts//themes/light.js';
import 'amcharts3/amcharts/plugins/export/export.css';

@Component({
  selector: 'amcharts',
  templateUrl: './amcharts.component.html',
  styleUrls: ['./amcharts.scss'],
  providers: [McompService]
})

export class AmChartComponent implements OnInit {
  visitData: any;
  errorMessage: string;
  mode = 'Observable';

  constructor(private _chartService: McompService) { }

  ngOnInit() { this.getHeroes(); }
  getHeroes() {
    this._chartService.getHeroes()
                      .subscribe(
                        data => {
                             this.visitData = data;
                             this.test( this.visitData );

                        },
                        error => this.errorMessage = <any>error);


  }

  test(data) {

    console.log('test', data);

    let chartData = generateChartData();

     let chart = AmCharts.makeChart('simplechartdiv', {
        "type": "serial",
        "theme": "light",
        'path': 'assets/img/amcharts-images',
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": data,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true,
            "balloon":{
                "drop":true
            }
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {
           "limitToGraph":"g1"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": false
        }
    });
    
    chart.addListener("rendered", zoomChart);
    zoomChart();
    
    // this method is called when chart is first inited as we listen for "rendered" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }
    
    
    // generate some random data, quite different range
    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 5);
    
        for (var i = 0; i < 1000; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
    
            var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;
    
            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    }
  }


  ngAfterViewInit() {

    let data: any = this._chartService.getHeroes();

    let dummyDate = new Date();
    let dummyData = [ { date: dummyDate, visits: 56 } ];
    console.log('dummyData ', dummyData );

  } // ends ngAfterViewInit
}
