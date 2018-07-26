import {CommonModule} from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './highcharts.routing';

import { HighChartsComponent } from './highcharts.component';

import { ChartModule } from 'angular2-highcharts';


@NgModule({
  declarations: [
    HighChartsComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],

  providers: [],
  bootstrap: [HighChartsComponent]
})
export class HighchartsModule { }
