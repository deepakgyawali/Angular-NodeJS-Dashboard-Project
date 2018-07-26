import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MycomponentsComponent } from './mycomponents.component';
import { routing } from './mycomponents.routing';

import { FormsModule } from '@angular/forms';



import { HttpModule, JsonpModule } from '@angular/http';

import { AmChartsModule } from "amcharts3-angular2";

import { AuthorInfoComponent } from './author-info/author-info.component';

import { StrategyStatisticsComponent } from './strategy-statistics/strategy-statistics.component';

import { HistoricStrategyChartComponent } from './historic-strategy-chart/historic-strategy-chart.component';

import { RealTimeStrategyChartComponent } from './real-time-strategy-chart/real-time-strategy-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,    
    JsonpModule,    
    routing,
    AmChartsModule
  ],
  declarations: [
    MycomponentsComponent,
    AuthorInfoComponent,
    StrategyStatisticsComponent,
    HistoricStrategyChartComponent,
    RealTimeStrategyChartComponent
  ]
})
export class MycomponentsModule {}