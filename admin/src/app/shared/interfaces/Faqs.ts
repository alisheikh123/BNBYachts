import { Observable } from 'rxjs';
export interface Faqs {
    id: number;
    categoryId : number;
    questionCategory: string;
    question : string;
    answer : string;
}
export interface AddFaqs {
    id: number;
    categoryId: number;
    question : string;
    answer : string;
}
export abstract class FaqsData {
    abstract GetFaqs();
    abstract AddFaqs(faqs : AddFaqs);
    abstract deleteFaqs(faqsId : number);
    abstract UpdateFaqs(faqs : AddFaqs)
}