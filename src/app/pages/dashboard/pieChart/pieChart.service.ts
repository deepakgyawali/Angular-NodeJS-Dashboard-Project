import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Strategies',
        stats: '50,120',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Revenue',
        stats: '$ 69,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Active Charts',
        stats: '108,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Authors',
        stats: '12,592',
        icon: 'refresh',
      },
	  {
        color: pieColor,
        description: 'Microservices',
        stats: '10,360',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'API Requests',
        stats: '169,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Online Users',
        stats: '1,391',
        icon: 'face',
      }
    ];
  }
}
