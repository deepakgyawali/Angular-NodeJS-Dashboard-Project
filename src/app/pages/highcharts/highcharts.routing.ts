import { Routes, RouterModule }  from '@angular/router';

import {HighChartsComponent} from './highcharts.component';


const routes: Routes = [
  {
    path: '',
    component: HighChartsComponent
  }
];

export const routing = RouterModule.forChild(routes);