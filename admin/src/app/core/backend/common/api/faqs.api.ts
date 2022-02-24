import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class FaqsApi {

  USER_API_URL = 'api/app/help-center/'
  constructor(private api: HttpService) {}

  getFaqsList(){
      return this.api.get(`${this.USER_API_URL}frequent-questions`)
  }
  AddFaqs(faqs : any){
    return this.api.post(`${this.USER_API_URL}frequent-questions`,faqs);
  }
  deleteFaqs(faqsId : number){
    return this.api.delete(`${this.USER_API_URL}faqs/${faqsId}`);
  }
  UpdateFaqs(faqs : any){
    return this.api.put(`${this.USER_API_URL}faqs`,faqs);
  }
}