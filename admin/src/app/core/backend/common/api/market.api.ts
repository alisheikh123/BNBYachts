import { AddCity, AddMarket } from './../../../../shared/interfaces/Market';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MarketApi {

  USER_API_URL = 'api/app/marketing/'
  constructor(private api: HttpService) {}
  getcities() {
    return this.api.getBoat(`${this.USER_API_URL}cities`);    
  }
  deleteCity(cityId : number){
    return this.api.deleteBoat(`${this.USER_API_URL}${cityId}/featured-city`); 
  }
  AddCity(city : AddCity) {
    return this.api.postBoat(`${this.USER_API_URL}city`,city);    
  }
  updateCity(city : AddCity){
    return this.api.putBoats(`${this.USER_API_URL}feature-city`,city); 
  }
  getMarketingPages() {
    return this.api.getBoat(`${this.USER_API_URL}market-pages`);    
  }
  deleteMarketPage(id : number){
    return this.api.deleteBoat(`${this.USER_API_URL}${id}/market-page`); 
  }
  AddMarketPage(market : AddMarket) {
    return this.api.postBoat(`${this.USER_API_URL}marketing-detail`,market);    
  }
  updateMarketPage(market : AddMarket){
    return this.api.putBoats(`${this.USER_API_URL}marketing-page`,market); 
  }
}