import { Component, Input, OnInit } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";

import { GetHistoricStrategyDataService } from "../get-historic-strategy-data/get-historic-strategy-data.service";
import { HistoricStrategyChartData } from '../data/historic-strategy-chart-data';
import { DataPoint } from '../data/data-point';

@Component({
  selector: 'historic-strategy-chart',
  templateUrl: './historic-strategy-chart.component.html',
  styleUrls: ['./historic-strategy-chart.component.scss'],
  providers: [ GetHistoricStrategyDataService ]
})
export class HistoricStrategyChartComponent implements OnInit {

    @Input('strategy-code') strategyCode: string;
    
    @Input('default-reference-year') defaultReferenceYear: number;
    @Input('default-start-month-day') defaultStartMonthDay: string;
    @Input('default-start-year-offset') defaultStartYearOffset: number;
    @Input('default-end-month-day') defaultEndMonthDay: string;
    @Input('default-end-year-offset') defaultEndYearOffset: number;
    @Input('default-frequency') defaultFrequency: string;
    @Input('default-swapped') defaultSwapped: string;

    public referenceYear: number;
    public startDate: string;
    public endDate: string;
    public frequency: string;
    public swapped: string;
    
    public chartId: string; //all charts on a page must have a different chart id!!
    private chart: any;
    
    
  constructor(private AmCharts: AmChartsService, private dataService: GetHistoricStrategyDataService) 
  {
      
  }

  ngOnInit() 
  {
      if(isNaN(this.defaultReferenceYear))
      {
          var now = new Date();
          var rYear = now.getFullYear();
          var startMonth = parseInt(this.defaultStartMonthDay.substring(0, 2));
          var startDay = parseInt(this.defaultStartMonthDay.substring(2, 4));
          
          while(new Date(rYear, startMonth, startDay, 0, 0, 0, 0) > now)
          {
              rYear -= 1;
          }
          
          this.defaultReferenceYear = rYear;
      }
      
      this.setDefaults();
      
      this.chartId = this.strategyCode+'-'+this.referenceYear+'-'+
          this.startDate+'-'+this.endDate+'-'+this.frequency+'-'+this.swapped+'-'+Math.floor(Math.random() * 100);
      //console.log(this.chartId);

      this.displayChart();
      
  }

  ngOnDestroy() {
      this.AmCharts.destroyChart(this.chart);
    }

  getInputDate(date)
  {
      var lMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var year = date.getFullYear();
  
      var month = date.getMonth();
      var monthFormatted = lMonths[month];
      
      var day = date.getDate();
      var dayFormatted = day;// < 10 ? '0' + day : day;
      
      return monthFormatted + ' ' + dayFormatted + ', ' + year;
  }
  
  formatDate(date)
  {
      console.log('format date: ' + date);
      
      var year = date.getFullYear(),
          month = date.getMonth() + 1, // months are zero indexed
          day = date.getDate(),
          hour = date.getHours(),
          minute = date.getMinutes(),
          second = date.getSeconds(),
          monthFormatted = month < 10 ? '0' + month : month,
          dayFormatted = day < 10 ? '0' + day : day,
          hourFormatted = hour < 10 ? '0' + hour : hour,
          minuteFormatted = minute < 10 ? '0' + minute : minute,
          secondFormatted = second < 10 ? '0' + second : second;
      
      //console.log('- year: ' + year);
      //console.log('- month: ' + monthFormatted);
      //console.log('- day: ' + dayFormatted);
      //console.log('- hour: ' + hourFormatted);
      //console.log('- minute: ' + minuteFormatted);
      //console.log('- second: ' + secondFormatted);
      
      return ''+ year + monthFormatted + dayFormatted + hourFormatted + minuteFormatted + secondFormatted;
  }
  
  updateStartDate(value: string)
  {
      if(this.startDate !== value)
      {
          this.startDate = value;
          this.displayChart();
      }
      
     
  }
  
  updateEndDate(value: string)
  {
      console.log('End date: ' + value)
      
      if(this.endDate !== value)
      {
          this.endDate = value;
          this.displayChart();
      }
      
  }
  
  updateFrequency(value: string)
  {
      if(this.frequency !== value)
      {
          this.frequency = value;
          this.displayChart();
      }
      
  }
  
  updateSwapped(value: string)
  {
      this.swapped = value;
      this.displayChart();
      
  }
  
  addReferenceYearOffset(offset: number)
  {
      console.log('Adding year offset: ' + offset);
      
      this.referenceYear += offset;
      
      var startYear = parseInt(this.startDate.substring(0, 4));
      this.startDate = (startYear+offset)+this.startDate.substring(4, this.startDate.length);
      
      var endYear = parseInt(this.endDate.substring(0, 4));
      this.endDate = (endYear+offset) + this.endDate.substring(4, this.endDate.length);
      
      this.displayChart();
  }
  
  refresh()
  {
      this.setDefaults();
      this.displayChart();
  }
  
  setDefaults()
  {
      this.referenceYear = this.defaultReferenceYear
      this.startDate = (this.defaultReferenceYear+this.defaultStartYearOffset) + this.defaultStartMonthDay;
      this.endDate = (this.defaultReferenceYear+this.defaultEndYearOffset) + this.defaultEndMonthDay;
      this.frequency = this.defaultFrequency;
      this.swapped = this.defaultSwapped;
      
  }
  
  displayChart() {
      if(this.chart != null)
      {
          if(this.chart != null)
          {
              this.chart.clear();
              this.chart = null;
          }
      }
      
      var message = this.dataService.getDataFromUrl(this.strategyCode, this.referenceYear, this.startDate, this.endDate, this.frequency, this.swapped)
      .subscribe(
      (message: HistoricStrategyChartData) => {
          
          //console.log(message);
          
          var minPeriodValue = this.dataService.getMinPeriodValue(this.frequency);
          
          var legLabels = message.legLabels;
          var legTitles = message.legTitles;
          var legCurrencies = message.legCurrencies;
          var legYearOffsets = message.legYearOffsets;
          
          var cLblLeg1 = legLabels[0];
          var cLblLeg2 = legLabels[1];
          var lblSpread = this.dataService.getLblSpread();
          var lblPl = this.dataService.getLblPl();
         
          var yearOffsetLeg1 = legYearOffsets[0];
          var yearOffsetLeg2 = legYearOffsets[1];
          
          var cTitleLeg1 = legTitles[0] + ' ' + (this.referenceYear + yearOffsetLeg1) + ' Long';
          var cTitleLeg2 = legTitles[1] + ' ' + (this.referenceYear + yearOffsetLeg2) + ' Short';
          
          var cCurrencyLeg1 = legCurrencies[0];
          var cCurrencyLeg2 = legCurrencies[1];
          
          var titleSpread = this.dataService.getTitleSpread();
          var titlePl = this.dataService.getTitlePl();
          
          var data = message.data;
            
          this.chart = this.AmCharts.makeChart(this.chartId, {
            
              type: 'stock',
              theme: 'light',
              autoResize: true,
              //dataDateFormat: "YYYY-MM-DDTHH:NN",
              pathToImages: "./dependencies/amcharts/images/",
              
              categoryAxesSettings: {
                  parseDates: true,
                  equalSpacing: true,
                  minPeriod: minPeriodValue,
                  axisHeight: 35
              },
              
              areasSettings: {
                  alpha: 0
              },
              
              dataSets: [
                  {
                      title: "",
                      fieldMappings: [{
                          fromField: 'leg1',
                          toField: cLblLeg1
                      }, {
                          fromField: 'leg2',
                          toField: cLblLeg2
                      }, {
                          fromField: 'spread',
                          toField: lblSpread
                      },
                      {
                          fromField: 'profit',
                          toField: lblPl
                      }                       
                      ],
                      dataProvider: data,
                      categoryField: "time"
                  }
              ],

              panels: [
                      {
                      showCategoryAxis: false,    //To display Dates on Axis
                      title: cTitleLeg1,  // " (in Cents)"
                      percentHeight: 20,
                      percentWidth: 100,
                      panelSpacing: 8,
                      valueAxes: [{
                          dashLength: 0,
                          axisThickness: 1,
                          color: "#000000"
                      }],
                          
                      stockGraphs: [
                      {
                          id: "g1",
                          type: "smoothedLine",   //To change the line style to Smoothed
                          useDataSetColors: false,
                          valueField: cLblLeg1,
                          alphaField: "alpha",
                          lineColor: '#20acd4',
                          balloonColor: '#667aad',
                          "bullet": "round",
                          "bulletBorderAlpha": 1,
                          "bulletColor": "#FFFFFF",
                          "bulletSize": 0,
                          "hideBulletsCount": 50,
                          "lineThickness": 2,
                          "useLineColorForBulletBorder": true,
                        
                          negativeLineColor: "red",
                          balloonText: ((cCurrencyLeg1 === 'cents') ? "<img src='./resources/img/"+ cCurrencyLeg1 +".png" +"'"  + " height='17px' width='17px' title='Normal' />" : cCurrencyLeg1 + '&nbsp;') +'<b>[[value]]</b>',    //<img width="15px" height="15px" src="./resources/img/cents.png" />
                          compareGraphBullet: "round"
                      }],
                      stockLegend: {
                          showEntries: true,
                          valueText: ""
                      }
                  },
                  
                  //---------------- SECOND LINE GRAPH    ----------------
                  {
                      showCategoryAxis: false,    //To display Dates on Axis
                      title: cTitleLeg2,  // " (in Cents)"
                      percentHeight: 20,
                      percentWidth: 100,
                      panelSpacing: 8,
                      
                      valueAxes: [{
                          dashLength: 0,
                          axisThickness: 1,
                          color: "#000000"
                       }],

                      stockGraphs: [
                      {
                          id: "g2",
                          type: "smoothedLine",           //To change the line style to Smoothed          
                          useDataSetColors: false,
                          valueField: cLblLeg2,
                          alphaField: "alpha",
                          lineColor: '#e5e600',   //#7FFF00   #ADFF2F #ffff00
                          balloonColor: '#e5e600',
                          "bullet": "round",
                          "bulletBorderAlpha": 1,
                          "bulletColor": "#FFFFFF",
                          "bulletSize": 5,
                          "hideBulletsCount": 50,
                          "lineThickness": 2,
                          "useLineColorForBulletBorder": true,
                          backgroundAlpha: 0,
                          negativeLineColor: "red",
                          balloonText: ((cCurrencyLeg2 === 'cents') ? "<img src='./resources/img/"+ cCurrencyLeg2 +".png" +"'"  + " height='17px' width='17px' title='Normal' />" : cCurrencyLeg2 + '&nbsp;') +'<b>[[value]]</b>',    //<img width="15px" height="15px" src="./resources/img/cents.png" />
                          lineAlpha: 1,
                      }],
                      stockLegend: {
                          showEntries: true,
                          valueText: ""
                      }
                  },                      
                  
                  
      //---------------- START THIRD LINE GRAPH   ----------------
                  {
                      showCategoryAxis: false,    //To display Dates on Axis
                      title: titleSpread, // " (in Cents)"
                      percentHeight: 20,
                      percentWidth: 100,
                      panelSpacing: 8,
                      
                      valueAxes: [{
                          dashLength: 0,
                          axisThickness: 1,
                          color: "#000000"
                        }],

                      stockGraphs: [
                      {
                          id: "g3",
                          type: "smoothedLine",           //To change the line style to Smoothed          
                          useDataSetColors: false,
                          valueField: lblSpread,
                          alphaField: "alpha",
                          lineColor: '#0B3B0B',   //#7FFF00   #ADFF2F #ffff00
                          negativeLineColor: "red",
                          balloonColor: '#0B3B0B',
                          "bullet": "round",
                          "bulletBorderAlpha": 1,
                          "bulletColor": "#FFFFFF",
                          "bulletSize": 5,
                          "hideBulletsCount": 50,
                          "lineThickness": 2,
                          useLineColorForBulletBorder: true,
                          backgroundAlpha: 0,
                          balloonText: lblSpread+'&nbsp;<b>[[value]]</b>',    //<img width="15px" height="15px" src="./resources/img/cents.png" />
                          lineAlpha: 1,
                      }],
                      stockLegend: {
                          showEntries: true,
                          valueText: ""
                      }
                  },                              
      //---------------- END THIRD LINE GRAPH ----------------
              
                                              
      //---------------   Column/Bar Graph setting start  --------------- 
              {
                  showCategoryAxis: true, //To display the DATES at bottom on Axis
                  title: titlePl,
                  percentHeight: 40,
                  percentWidth: 100,

                  valueAxes: [{
                    dashLength: 0,
                    axisThickness: 0.5,
                    autoGridCount: false,
                    "axisAlpha": 0,
                    color: "#000000",
                    "position": "left",
                    "title": ""
                  }],
                  
                  "startDuration": 1,

                  stockGraphs: [{
                      id: "graph4",
                      useDataSetColors: false,    //To take the applied color instead of defauly colors
                      type: "column",
                      autoGridCount: false,
                      valueField: lblPl,
                      balloonColor: "#00FF00",        //#62cf73       #667aad
                      comparable: true,
                      compareField: lblSpread,
                      negativeFillColors: "black",
                      negativeLineColor: "black",
                      "lineColor": "green",   //#7f8da9
                      "fillColors":  "green",     //#7f8da9
                      "fillAlphas": 1,
                      "lineAlpha": 1,
                      highField:  "high",
                      lowField:  "low",
                      balloonText: "P/L: USD <b>[[value]]</b>",
                      compareGraphBullet: "round"
                  }
                  ],
                          stockLegend: {
                              showEntries: false
                          }
                  
                  }   //End of Stock Graphs
                      ],  //End of Panels
              
                      
              panelsSettings: {
                  columnWidth: 0.15,
                  columnSpacing: 15
              },              
                      
              "chartScrollbar": {
              "graph": "g1",
              "oppositeAxis": false,
              "offset": 30,
              "scrollbarHeight": 50,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": false,
              "color": "#AAAAAA"
              },
              
              //Value line setting when moved the cursor over points
              chartCursorSettings: {
                  "valueBalloonsEnabled": true, //To show the Balloons when moused moved
                  "fullWidth": false, //To enable the active line shadow
                  "cursorAlpha": 0.5,
                  "valueLineBalloonEnabled": false,
                  "valueLineEnabled": true,
                  "valueLineAlpha": 0.5
              }
                      
              
          });
      },
      error =>  {
          console.log('Error: ' + error);
      });;

  }
  
}

  
  
  