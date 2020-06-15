import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SearchQueries} from '../_model/search-query';
import {StockData} from '../_model/stock-data';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  // private subTrigger = new BehaviorSubject<boolean>(true);
  // triggerData = this.subTrigger.asObservable();

  constructor(private http: HttpClient) {
  }



  getHttp(params):Observable<any> {
    let query = new HttpParams();
    Object.entries(params).map((p) => {
      query = query.set(p[0].toString(), p[1].toString());
    });
    return this.http.get(`${environment.baseApi}`, {params: query});
  }

}
