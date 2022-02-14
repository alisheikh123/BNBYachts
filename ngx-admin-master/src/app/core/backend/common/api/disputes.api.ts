import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class DisputesApi {

  USER_API_URL = 'api/app/dispute/'
  constructor(private api: HttpService) {}
  getDisputes() {
    return this.api.getBooking(`${this.USER_API_URL}dispute-list`);    
  }
}