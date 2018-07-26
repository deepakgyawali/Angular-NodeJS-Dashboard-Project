import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { RealTimeDataPoint } from '../data/real-time-data-point';


interface Callback { (data: any): void; }

declare class EventSource {
    onmessage: Callback;
    onerror: Callback;
    addEventListener(event: string, cb: Callback): void;
    constructor(name: string);
}


@Injectable()
export class GetRealTimeStrategyDataService {

    
    /*
     * TODO: dataUrl needs to be relative, not absolute!!! 
     */
  private dataUrl = 'http://192.168.22.249:9000/realTimeStrategies'; //?strategy=1048';
    
    
  constructor(private http: Http) { }

  getDataStreamFromUrl(strategyCode: string): Observable<RealTimeDataPoint>{
    
    var url = this.dataUrl + '?' + 'strategy=' + strategyCode;
    
    console.log('URL: ' + url);
    
    
    return Observable.create((observer) => {
    
        const eventSource = new EventSource(url);
                eventSource.onmessage = x => observer.next(JSON.parse(x.data));
                eventSource.onerror = x => observer.error(x);

                return () => {
//                    eventSource.close();
                };
        
    });
  }
  
    
  
}
