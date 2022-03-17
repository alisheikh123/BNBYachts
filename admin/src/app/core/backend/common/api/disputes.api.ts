import { ChangeStatus } from './../../../../shared/interfaces/IDispute';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class DisputesApi {

  USER_API_URL = 'api/app/dispute/'
  constructor(private api: HttpService) {}
  getDisputes() {
    return this.api.getBooking(`${this.USER_API_URL}dispute-list`);    
  }
  getDisputeById(id : number) {
    return this.api.getBooking(`${this.USER_API_URL}${id}/disputeby-id`);    
  }
  ChangeDisputeStatus(status : ChangeStatus) {
    return this.api.postBooking(`${this.USER_API_URL}change-dispute-status`,status);    
  }
}