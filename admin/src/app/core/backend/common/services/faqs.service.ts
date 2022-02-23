import { FaqsApi } from './../api/faqs.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddFaqs,FaqsData } from '../../../../shared/interfaces/Faqs';

@Injectable()
export class FaqsService extends FaqsData {
  constructor(private api: FaqsApi) {
    super();
  }
  GetFaqs(): Observable<any> {
    return this.api.getFaqsList();
  }
  AddFaqs(faqs: AddFaqs) {
    return this.api.AddFaqs(faqs);
  }
  UpdateFaqs(faqs: AddFaqs) {
    return this.api.UpdateFaqs(faqs);
  }
  deleteFaqs(faqsId: number) {
    return this.api.deleteFaqs(faqsId);
  }
}
