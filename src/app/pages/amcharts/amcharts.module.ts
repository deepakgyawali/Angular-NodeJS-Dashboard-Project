import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AmChartComponent } from './amcharts.component';
import { routing } from './amcharts.routing';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    routing,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AmChartComponent
  ]
})
export class AmchartModule {}
