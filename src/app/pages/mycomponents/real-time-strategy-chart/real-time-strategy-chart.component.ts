import { Component, Input, OnInit } from '@angular/core';
import { AmChartsService } from "amcharts3-angular2";

import { GetRealTimeStrategyDataService } from "../get-real-time-strategy-data/get-real-time-strategy-data.service";
import { RealTimeDataPoint } from '../data/real-time-data-point';

import { GetStrategyLegDataService } from '../get-strategy-leg-data/get-strategy-leg-data.service';
import { StrategyLegData } from '../data/strategy-leg-data';

@Component({
  selector: 'real-time-strategy-chart',
  templateUrl: './real-time-strategy-chart.component.html',
  styleUrls: ['./real-time-strategy-chart.component.css'],
  providers: [ GetRealTimeStrategyDataService, GetStrategyLegDataService ]
})
export class RealTimeStrategyChartComponent implements OnInit {

    @Input('strategy-code') strategyCode: string;
    
    public chartId: string; //all charts on a page must have a different chart id!!
    private chart: any;
    private startSpread: number; //we do not read profit from the data stream, but we calculate it (this will need to be updated)

    
  constructor(private AmCharts: AmChartsService, private legDataService: GetStrategyLegDataService, private realTimeDataService: GetRealTimeStrategyDataService) { }

  ngOnInit() 
  {
      this.chartId = "rt-" + this.strategyCode;
      
      var message = this.legDataService.getDataFromUrl(this.strategyCode)
      .subscribe(
      (message: StrategyLegData) => {
          
          //console.log(message);
          
          var cLblLeg1 = message.legLabels[0];
          var cLblLeg2 = message.legLabels[1];
          var lblSpread = 'SP';
          var lblPl = 'PL';
          
          var cTitleLeg1 = message.legTitles[0] + ' Long';
          var cTitleLeg2 = message.legTitles[1] + ' Short';
          
          var cCurrencyLeg1 = message.legCurrencies[0];
          var cCurrencyLeg2 = message.legCurrencies[1];
          
          var titleSpread = 'Spread (Long minus Short)';
          var titlePl = 'Profit/Loss in US Dollars';
      
          this.chart = this.AmCharts.makeChart(this.chartId, {
              
              type: 'stock',
              theme: 'light',
              autoResize: true,
              //dataDateFormat: "YYYY-MM-DDTHH:NN",
              pathToImages: "./dependencies/amcharts/images/",
              
              zoomOutOnDataSetChange: true,
              glueToTheEnd: true,
              
              categoryAxesSettings: {
                  parseDates: true,
                  equalSpacing: true,
                  minPeriod: 'ss',
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
                      dataProvider: [],
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
                      
              // Scrollbar settings
              chartScrollbarSettings: {
                  enabled: false
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
          

            this.realTimeDataService.getDataStreamFromUrl(this.strategyCode)
            .subscribe(
            (message: RealTimeDataPoint) => {
                
//                console.log(message);
//                console.log(message.leg1);
                if(!message.time || !message.leg1 || !message.leg2 || !message.priceSpread)
                {
                    return;
                }
                
                if(!this.startSpread)
                {
                    this.startSpread = message.priceSpread;
                }
                
                this.AmCharts.updateChart(this.chart, () => {

                    if(this.chart.dataSets[0].dataProvider.length == 60)
                    {
                        this.chart.dataSets[0].dataProvider.shift();
                    }
                    
                    this.chart.dataSets[0].dataProvider.push({
                        time: message.time,
                        leg1: message.leg1,
                        leg2: message.leg2,
                        spread: message.priceSpread,
                        profit: (message.priceSpread - this.startSpread)
                       });
                    
                    this.chart.validateData();
                  });
                
                
            },
            error =>  {
                console.log('Error: ' + JSON.stringify(error));
            });;

          
      },
      error =>  {
          console.log('Error: ' + error);
      });;
      
       
    
      
              
          
  }

  ngOnDestroy() {
      this.AmCharts.destroyChart(this.chart);
    }
  
}
