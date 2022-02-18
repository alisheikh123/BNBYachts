import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable()
export class HttpService {
  
  CORE_API_URL = environment.CORE_API_URL;
  BOOKING_API_URL = environment.BOOKING_API_URL;
  BOAT_API_URL = environment.BOAT_API_URL;
  constructor(private http: HttpClient) {}

  getServerDataSource(uri: string): DataSource {
    return new ServerDataSource(this.http,
      {
        endPoint: uri,
        totalKey: 'totalCount',
        dataKey: 'items',
        pagerPageKey: 'pageNumber',
        pagerLimitKey: 'pageSize',
        filterFieldKey: 'filterBy#field#',
        sortFieldKey: 'sortBy',
        sortDirKey: 'orderBy',
      });
  }

  get(endpoint: string, options?): any {
    return this.http.get(`${this.CORE_API_URL}/${endpoint}`, options);
  }
  getBooking(endpoint: string, options?): any {
    return this.http.get(`${this.BOOKING_API_URL}/${endpoint}`, options);
  }
  getBoat(endpoint: string, options?): any {
    return this.http.get(`${this.BOAT_API_URL}/${endpoint}`, options);
  }
  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.CORE_API_URL}/${endpoint}`, data, options);
  }
  postwithoutData(endpoint: string, options?): Observable<any> {
    return this.http.post(`${this.CORE_API_URL}/${endpoint}`, options);
  }
}
