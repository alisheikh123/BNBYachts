import { AddServiceFee, ServiceFee } from './../../../../shared/interfaces/settings';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ServiceFeeApi {

  USER_API_URL = 'api/app/setting/'
  constructor(private api: HttpService) {}
  getServiceFee() {
    return this.api.getBoat(`${this.USER_API_URL}service-fees`);    
  }
  deleteServiceFee(id : number){
    return this.api.deleteBoat(`${this.USER_API_URL}${id}/servicesfee`); 
  }
  AddServiceFee(service : AddServiceFee) {
    return this.api.postBoat(`${this.USER_API_URL}service-fee`,service);    
  }
  updateServiceFee(service : AddServiceFee){
    return this.api.putBoats(`${this.USER_API_URL}services-fee`,service); 
  }
  getServiceFeeByBoatType(BoatTypeId : number) {
    return this.api.getBoat(`${this.USER_API_URL}getservice-fee-by-boat-type/${BoatTypeId}`);    
  }
  getNewsLetters() {
    return this.api.get(`${this.NEWS_API_URL}service-fees`);    
  }
  deleteNewsLetter(id : number){
    return this.api.delete(`${this.NEWS_API_URL}${id}/servicesfee`); 
  }
  AddNewsLetter(service : AddServiceFee) {
    return this.api.post(`${this.NEWS_API_URL}service-fee`,service);    
  }
  updateNewsLetter(service : AddServiceFee){
    return this.api.put(`${this.NEWS_API_URL}services-fee`,service); 
  }
}