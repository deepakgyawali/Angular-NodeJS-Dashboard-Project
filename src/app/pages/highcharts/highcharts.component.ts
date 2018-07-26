import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighChartsComponent {

    private year: any;
    
 constructor(private http: Http) {
        
    }   
    loadData() {
        var re = /YY/gi; 
        let JSON_FILE_NAME = 'src/assets/json/NG_weighted_firstOfMonth_up_to_year_2015_history_YY_years.json'; 
        var jsonName = JSON_FILE_NAME.replace(re, this.year);
        console.log(jsonName);
        //   'http://192.168.11.155/multi-charts-dev/samurai_charts/data/jsonp.php?filename='+ jsonName +'&callback=?'
        this.http.get(jsonName).subscribe(res => {
            console.log(res.json());
            var CURRENCY_SYMBOL = "USD"; 
            var dataSeries = []; 
            res.json().forEach(function (e) { 
                 
                var date = Date.parse(e.Date); 
                var avg = parseFloat(e.AVG); 
                 
                var cell = []; 
                cell.push(date); 
                cell.push(avg); 
                dataSeries.push(cell); 
                 
            }); 
            this.options = {               
                    chart: {                        
                     backgroundColor: "#f5f5f5",
                        type: 'line' 
                    }, 
                    title: { 
                        text: 'NATURAL GAS'
                    }, 
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: { 
                        title: { 
                            text: 'Price (' + CURRENCY_SYMBOL + ')' 
                        }, 
                        minTickInterval: 0.01 
                    }, 
                    tooltip: { 
                        headerFormat: '', 
                        pointFormat: '{point.x:%e. %b}: ' + CURRENCY_SYMBOL + ' {point.y}' 
                    }, 
                    legend: { 
                        enabled: true 
                    }, 
                    credits: { 
                        enabled: false 
                    }, 
                    
                series : [{
                    data : dataSeries,                   
                }]
            };
            
            var availableData = [5,10,15,20]; 
            
        });
    }
    options: Object;
}

declare var require: any;

const Highcharts = require('highcharts/highstock');

Highcharts.setOptions({

  "colors": [
    "#41B5E9",
    "#FA8832",
    "#34393C",
    "#E46151"
  ],
  "chart": {
    "style": {
      "color": "#333",
      "fontFamily": "Open Sans"
    }
  },
  "title": {
    "style": {
      "fontFamily": "Raleway",
      "fontWeight": "100"
    }
  },
  "subtitle": {
    "style": {
      "fontFamily": "Raleway",
      "fontWeight": "100"
    }
  },
  "legend": {
    "align": "right",
    "verticalAlign": "bottom"
  },
  "xAxis": {
    "gridLineWidth": 1,
    "gridLineColor": "#F3F3F3",
    "lineColor": "#F3F3F3",
    "minorGridLineColor": "#F3F3F3",
    "tickColor": "#F3F3F3",
    "tickWidth": 1
  },
  "yAxis": {
    "gridLineColor": "#F3F3F3",
    "lineColor": "#F3F3F3",
    "minorGridLineColor": "#F3F3F3",
    "tickColor": "#F3F3F3",
    "tickWidth": 1
  }

});


