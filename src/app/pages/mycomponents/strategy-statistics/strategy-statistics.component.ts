import { Component, Input, OnInit } from '@angular/core';

import { GetStrategyStatisticsService } from '../get-strategy-statistics/get-strategy-statistics.service';

import { StrategyStatisticsData } from '../data/strategy-statistics-data';

@Component({
  selector: 'strategy-statistics',
  templateUrl: './strategy-statistics.component.html',
  styleUrls: ['./strategy-statistics.component.css'],
  providers: [ GetStrategyStatisticsService ]
})
export class StrategyStatisticsComponent implements OnInit {

    @Input('strategy-code') strategyCode: string;
    
    public Days: number;
    public Years: number;
    public Winners: number;
    public Losers: number;
    public BPL: number;
    public BPLyear: number;
    public BSP: number;
    public WPL: number;
    public WPLyear: number;
    public WSP: number;
    public AverageP: number;
    public AverageL: number;
    public RRYEAR: number;
    
  constructor(private dataService: GetStrategyStatisticsService) { }

  ngOnInit() 
  {
      var message = this.dataService.getDataFromUrl(this.strategyCode)
      .subscribe(
      (message: StrategyStatisticsData) => {
          
          //console.log(message);
          
          this.Days = message.Days;
          this.Years = message.Years;
          this.Winners = message.Winners;
          this.Losers = message.Losers;
          this.BPL = message.BPL;
          this.BPLyear = message.BPLyear;
          this.BSP = message.BSP;
          this.WPL = message.WPL;
          this.WPLyear = message.WPLyear;
          this.WSP = message.WSP;
          this.AverageP = message.AverageP;
          this.AverageL = message.AverageL;
          this.RRYEAR = message.RRYEAR;
          
      });
  }

}
