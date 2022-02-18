import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class BoatsApi {

  USER_API_URL = 'api/app/host-boat/'
  constructor(private api: HttpService) {}
  getBoatsByUserId(userId : string) {
    return this.api.getBoat(`${this.USER_API_URL}boat-details-by-user-id/${userId}`);    
  }
}