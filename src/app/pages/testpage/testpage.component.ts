import {Component} from '@angular/core';

@Component({
  selector: 'testpage',
  templateUrl: './testpage.component.html',
  styles: [`
  #chartdiv, #chartdiv2 {
	width	: 100%;
	height	: 500px;
	background-color: rgb(242, 242, 242);
	margin-bottom: 20px;
	margin-top: 13px;
  }
  .title {
      font-weight: 300;
  }
  	`]
})
export class TestpageComponent {
var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "marginTop":0,
    "marginRight": 80,
    "dataProvider": [{
        "year": "1950",
        "value": -0.307
    }, {
        "year": "1951",
        "value": -0.168
    }, {
        "year": "1952",
        "value": -0.073
    }, {
        "year": "1953",
        "value": -0.027
    }, {
        "year": "1954",
        "value": -0.251
    }, {
        "year": "1955",
        "value": -0.281
    }, {
        "year": "1956",
        "value": -0.348
    }, {
        "year": "1957",
        "value": -0.074
    }, {
        "year": "1958",
        "value": -0.011
    }, {
        "year": "1959",
        "value": -0.074
    }, {
        "year": "1960",
        "value": -0.124
    }, {
        "year": "1961",
        "value": -0.024
    }, {
        "year": "1962",
        "value": -0.022
    }, {
        "year": "1963",
        "value": 0
    }, {
        "year": "1964",
        "value": -0.296
    }, {
        "year": "1965",
        "value": -0.217
    }, {
        "year": "1966",
        "value": -0.147
    }, {
        "year": "1967",
        "value": -0.15
    }, {
        "year": "1968",
        "value": -0.16
    }, {
        "year": "1969",
        "value": -0.011
    }, {
        "year": "1970",
        "value": -0.068
    }, {
        "year": "1971",
        "value": -0.19
    }, {
        "year": "1972",
        "value": -0.056
    }, {
        "year": "1973",
        "value": 0.077
    }, {
        "year": "1974",
        "value": -0.213
    }, {
        "year": "1975",
        "value": -0.17
    }, {
        "year": "1976",
        "value": -0.254
    }, {
        "year": "1977",
        "value": 0.019
    }, {
        "year": "1978",
        "value": -0.063
    }, {
        "year": "1979",
        "value": 0.05
    }, {
        "year": "1980",
        "value": 0.077
    }, {
        "year": "1981",
        "value": 0.12
    }, {
        "year": "1982",
        "value": 0.011
    }, {
        "year": "1983",
        "value": 0.177
    }, {
        "year": "1984",
        "value": -0.021
    }, {
        "year": "1985",
        "value": -0.037
    }, {
        "year": "1986",
        "value": 0.03
    }, {
        "year": "1987",
        "value": 0.179
    }, {
        "year": "1988",
        "value": 0.18
    }, {
        "year": "1989",
        "value": 0.104
    }, {
        "year": "1990",
        "value": 0.255
    }, {
        "year": "1991",
        "value": 0.21
    }, {
        "year": "1992",
        "value": 0.065
    }, {
        "year": "1993",
        "value": 0.11
    }, {
        "year": "1994",
        "value": 0.172
    }, {
        "year": "1995",
        "value": 0.269
    }, {
        "year": "1996",
        "value": 0.141
    }, {
        "year": "1997",
        "value": 0.353
    }, {
        "year": "1998",
        "value": 0.548
    }, {
        "year": "1999",
        "value": 0.298
    }, {
        "year": "2000",
        "value": 0.267
    }, {
        "year": "2001",
        "value": 0.411
    }, {
        "year": "2002",
        "value": 0.462
    }, {
        "year": "2003",
        "value": 0.47
    }, {
        "year": "2004",
        "value": 0.445
    }, {
        "year": "2005",
        "value": 0.47
    }],
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
    }],
    "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
    }],
    "chartScrollbar": {
        "graph":"g1",
        "gridAlpha":0,
        "color":"#888888",
        "scrollbarHeight":55,
        "backgroundAlpha":0,
        "selectedBackgroundAlpha":0.1,
        "selectedBackgroundColor":"#888888",
        "graphFillAlpha":0,
        "autoGridCount":true,
        "selectedGraphFillAlpha":0,
        "graphLineAlpha":0.2,
        "graphLineColor":"#c2c2c2",
        "selectedGraphLineColor":"#888888",
        "selectedGraphLineAlpha":1

    },
    "chartCursor": {
        "categoryBalloonDateFormat": "YYYY",
        "cursorAlpha": 0,
        "valueLineEnabled":true,
        "valueLineBalloonEnabled":true,
        "valueLineAlpha":0.5,
        "fullWidth":true
    },
    "dataDateFormat": "YYYY",
    "categoryField": "year",
    "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    }
});

chart.addListener("rendered", zoomChart);
if(chart.zoomChart){
  chart.zoomChart();
}

function zoomChart(){
    chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
}



//Second Chart
var chart2 = AmCharts.makeChart("chartdiv2", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "equalWidths": false,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 120
    },
    "dataProvider": [{
        "date": "2012-01-01",
        "distance": 227,
        "townName": "New York",
        "townName2": "New York",
        "townSize": 25,
        "latitude": 40.71,
        "duration": 408
    }, {
        "date": "2012-01-02",
        "distance": 371,
        "townName": "Washington",
        "townSize": 14,
        "latitude": 38.89,
        "duration": 482
    }, {
        "date": "2012-01-03",
        "distance": 433,
        "townName": "Wilmington",
        "townSize": 6,
        "latitude": 34.22,
        "duration": 562
    }, {
        "date": "2012-01-04",
        "distance": 345,
        "townName": "Jacksonville",
        "townSize": 7,
        "latitude": 30.35,
        "duration": 379
    }, {
        "date": "2012-01-05",
        "distance": 480,
        "townName": "Miami",
        "townName2": "Miami",
        "townSize": 10,
        "latitude": 25.83,
        "duration": 501
    }, {
        "date": "2012-01-06",
        "distance": 386,
        "townName": "Tallahassee",
        "townSize": 7,
        "latitude": 30.46,
        "duration": 443
    }, {
        "date": "2012-01-07",
        "distance": 348,
        "townName": "New Orleans",
        "townSize": 10,
        "latitude": 29.94,
        "duration": 405
    }, {
        "date": "2012-01-08",
        "distance": 238,
        "townName": "Houston",
        "townName2": "Houston",
        "townSize": 16,
        "latitude": 29.76,
        "duration": 309
    }, {
        "date": "2012-01-09",
        "distance": 218,
        "townName": "Dalas",
        "townSize": 17,
        "latitude": 32.8,
        "duration": 287
    }, {
        "date": "2012-01-10",
        "distance": 349,
        "townName": "Oklahoma City",
        "townSize": 11,
        "latitude": 35.49,
        "duration": 485
    }, {
        "date": "2012-01-11",
        "distance": 603,
        "townName": "Kansas City",
        "townSize": 10,
        "latitude": 39.1,
        "duration": 890
    }, {
        "date": "2012-01-12",
        "distance": 534,
        "townName": "Denver",
        "townName2": "Denver",
        "townSize": 18,
        "latitude": 39.74,
        "duration": 810
    }, {
        "date": "2012-01-13",
        "townName": "Salt Lake City",
        "townSize": 12,
        "distance": 425,
        "duration": 670,
        "latitude": 40.75,
        "dashLength": 8,
        "alpha": 0.4
    }, {
        "date": "2012-01-14",
        "latitude": 36.1,
        "duration": 470,
        "townName": "Las Vegas",
        "townName2": "Las Vegas"
    }, {
        "date": "2012-01-15"
    }, {
        "date": "2012-01-16"
    }, {
        "date": "2012-01-17"
    }, {
        "date": "2012-01-18"
    }, {
        "date": "2012-01-19"
    }],
    "valueAxes": [{
        "id": "distanceAxis",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left",
        "title": "distance"
    }, {
        "id": "latitudeAxis",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "labelsEnabled": false,
        "position": "right"
    }, {
        "id": "durationAxis",
        "duration": "mm",
        "durationUnits": {
            "hh": "h ",
            "mm": "min"
        },
        "axisAlpha": 0,
        "gridAlpha": 0,
        "inside": true,
        "position": "right",
        "title": "duration"
    }],
    "graphs": [{
        "alphaField": "alpha",
        "balloonText": "[[value]] miles",
        "dashLengthField": "dashLength",
        "fillAlphas": 0.7,
        "legendPeriodValueText": "total: [[value.sum]] mi",
        "legendValueText": "[[value]] mi",
        "title": "distance",
        "type": "column",
        "valueField": "distance",
        "valueAxis": "distanceAxis"
    }, {
        "balloonText": "latitude:[[value]]",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "useLineColorForBulletBorder": true,
        "bulletColor": "#FFFFFF",
        "bulletSizeField": "townSize",
        "dashLengthField": "dashLength",
        "descriptionField": "townName",
        "labelPosition": "right",
        "labelText": "[[townName2]]",
        "legendValueText": "[[value]]/[[description]]",
        "title": "latitude/city",
        "fillAlphas": 0,
        "valueField": "latitude",
        "valueAxis": "latitudeAxis"
    }, {
        "bullet": "square",
        "bulletBorderAlpha": 1,
        "bulletBorderThickness": 1,
        "dashLengthField": "dashLength",
        "legendValueText": "[[value]]",
        "title": "duration",
        "fillAlphas": 0,
        "valueField": "duration",
        "valueAxis": "durationAxis"
    }],
    "chartCursor": {
        "categoryBalloonDateFormat": "DD",
        "cursorAlpha": 0.1,
        "cursorColor":"#000000",
         "fullWidth":true,
        "valueBalloonsEnabled": false,
        "zoomable": false
    },
    "dataDateFormat": "YYYY-MM-DD",
    "categoryField": "date",
    "categoryAxis": {
        "dateFormats": [{
            "period": "DD",
            "format": "DD"
        }, {
            "period": "WW",
            "format": "MMM DD"
        }, {
            "period": "MM",
            "format": "MMM"
        }, {
            "period": "YYYY",
            "format": "YYYY"
        }],
        "parseDates": true,
        "autoGridCount": false,
        "axisColor": "#555555",
        "gridAlpha": 0.1,
        "gridColor": "#FFFFFF",
        "gridCount": 50
    },
    "export": {
        "enabled": true
     }
});
}