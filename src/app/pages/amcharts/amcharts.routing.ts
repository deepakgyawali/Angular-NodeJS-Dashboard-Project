import { Routes, RouterModule }  from '@angular/router';
import { AmChartComponent } from './amcharts.component';

const routes: Routes = [
  {
    path: '',
    component: AmChartComponent
  }
];

export const routing = RouterModule.forChild(routes);
