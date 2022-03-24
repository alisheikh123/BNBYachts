import { NewsLetterApi } from './../api/newsLetter.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddNewsLetter, NewsLetter, NewsLetterData, SubscribedUser } from '../../../../shared/interfaces/NewsLetter';

@Injectable()
export class NewsLetterService extends NewsLetterData {
  constructor(private api: NewsLetterApi) {
    super();
  }
  getNewsLetters(): Observable<NewsLetter[]> {
     return this.api.getNewsLetters();
  }
  getSubscribedUser(): Observable<SubscribedUser[]> {
    return this.api.getSubscribedUser();
  }
  deleteNewsLetter(id: number) {
    return this.api.deleteNewsLetter(id);
  }
  AddNewsLetter(service: AddNewsLetter) {
    return this.api.AddNewsLetter(service);
  }
  updateNewsLetter(service: AddNewsLetter) {
    return this.api.updateNewsLetter(service);
  }
}