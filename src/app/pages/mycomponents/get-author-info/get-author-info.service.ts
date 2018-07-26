import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LegInfo } from '../data/leg-info';
import { AuthorInfoData } from '../data/author-info-data';

@Injectable()
export class GetAuthorInfoService {

 
  /*
   * TODO: dataUrl needs to be relative, not absolute!!! 
   */  
    private dataUrl = 'http://192.168.23.61:64302/author-info-microservice.1.0.0/getAuthorInfo/';
    
  constructor(private http: Http) { }
  
  getDataFromUrl(strategyCode: string): Observable<AuthorInfoData> {
    
    var url = this.dataUrl + strategyCode;
    
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
}
