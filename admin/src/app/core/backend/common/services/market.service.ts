import { MarketApi } from './../api/market.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCity, AddMarket, City, MarketData, Markets } from '../../../../shared/interfaces/Market';

@Injectable()
export class MarketService extends MarketData {
  constructor(private api: MarketApi) {
    super();
  }
  getCities(): Observable<City[]> {
    return this.api.getcities();
  }
  deleteCity(id : number) {
    debugger;
    return this.api.deleteCity(id);
  } 
  AddCity(faqs: AddCity) {
    return this.api.AddCity(faqs);
  }
  UpdateCity(faqs: AddCity) {
    return this.api.updateCity(faqs);
  }
  getMarketingPages(): Observable<Markets[]> {
    return this.api.getMarketingPages();
  }
  deleteMarketPage(id: number) {
    return this.api.deleteMarketPage(id);
  }
  AddMarketPage(market: AddMarket) {
    return this.api.AddMarketPage(market);
  }
  updateMarketPage(market: AddMarket) {
    return this.api.updateMarketPage(market);
  }
}