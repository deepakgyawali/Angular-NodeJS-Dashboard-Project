import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataPoint } from '../data/data-point';

import { HistoricStrategyChartData } from '../data/historic-strategy-chart-data';


@Injectable()
export class GetHistoricStrategyDataService {

    /*
     * TODO: dataUrl needs to be relative, not absolute!!! 
     */
  private dataUrl = 'http://192.168.23.61:64301/strategy-microservice.1.0.0/getChartData/';
    
  constructor (private http: Http) {}
  
  getDataFromUrl(strategyCode: string, 
                  referenceYear: number, 
                  startDate: string, endDate: string, 
                  frequency: string,
                  swapped: string): Observable<HistoricStrategyChartData> {
      
      var url = this.dataUrl + strategyCode + '?' +
              'referenceYear=' + referenceYear +
              '&start=' + startDate + 
              '&end=' + endDate + 
              '&frequency=' + frequency + 
              '&swapped=' + swapped;
      
      console.log('URL: ' + url);
      
      var result = this.http.get(url)
                            .map(this.extractData)
                            .catch(this.handleError);
      
      return result;
   }
  
  private extractData(res: Response) {
      let body = res.json();
      var parsedBody = JSON.parse(body.message);
      return parsedBody || {};
//      return new DataWithLegInfo(parsedBody.lblLeg1, parsedBody.lblLeg2,
//            parsedBody.titleLeg1, parsedBody.titleLeg2,
//            parsedBody.currencyLeg1, parsedBody.currencyLeg2,
//            parsedBody.yearOffsetLeg1, parsedBody.yearOffsetLeg2,
//            parsedBody.data);
    }
  
  private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
  
  getMinPeriodValue(frequency: string): string {
      
      var minPeriodValue = 'DD';
      if(frequency === 'minutes')
      {
          minPeriodValue = 'mm';
      }else if(frequency === 'daily')
      {
          minPeriodValue = 'DD';
      }else if(frequency === 'quarterly')
      {
          minPeriodValue = 'MM';
      }else if(frequency === 'yearly')
      {
          minPeriodValue = 'YYYY';
      }
      
      return minPeriodValue;
  }
  
  getLblSpread(): string {
      return 'SP';
  }
  
  getTitleSpread(): string {
      return 'Spread (Long minus Short)';
  }
  
  getLblPl(): string {
      return 'PL';
  }
  
  getTitlePl(): string {
      return 'Profit/Loss in US Dollars';
  }
  
}
