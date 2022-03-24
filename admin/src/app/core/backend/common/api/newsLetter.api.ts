import { AddServiceFee, ServiceFee } from './../../../../shared/interfaces/settings';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AddNewsLetter } from '../../../../shared/interfaces/NewsLetter';

@Injectable()
export class NewsLetterApi {

  NEWS_API_URL = 'api/app/news-letter/';
  constructor(private api: HttpService) {}
  getNewsLetters() {
    return this.api.get(`${this.NEWS_API_URL}news-letter`);    
  }
  getSubscribedUser() {
    return this.api.get(`${this.NEWS_API_URL}subscribed-users`);    
  }
  deleteNewsLetter(id : number){
    return this.api.delete(`${this.NEWS_API_URL}${id}/news-letter`); 
  }
  AddNewsLetter(service : AddNewsLetter) {
    return this.api.post(`${this.NEWS_API_URL}news-letters-subscription`,service);    
  }
  updateNewsLetter(service : AddNewsLetter){
    return this.api.put(`${this.NEWS_API_URL}news-letter`,service); 
  }
}