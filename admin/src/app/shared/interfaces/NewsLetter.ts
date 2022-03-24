import { Observable } from "rxjs";

export interface NewsLetter{
    id : number;
    title : string;
    description : string;
    letterImage : string;
    letterTypeId : number;
    letterType : string;
    contactID : string;
}
export interface AddNewsLetter{
    id : number;
    title : string;
    description : string;
    letterImage : string;
    letterTypeId : number;
    contactID : string;
    newsLetterGallery :any;
}
export interface SubscribedUser{
    id : number;
    emailAddress : string;
    creationTime : Date ;
}
export abstract class NewsLetterData{
    abstract getNewsLetters() : Observable<NewsLetter[]>
    abstract deleteNewsLetter(id : number);
    abstract AddNewsLetter(service : AddNewsLetter);
    abstract updateNewsLetter(service : AddNewsLetter);
    abstract getSubscribedUser() : Observable<SubscribedUser[]>
}