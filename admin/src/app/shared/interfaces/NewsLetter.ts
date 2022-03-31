import { Observable } from "rxjs";

export interface NewsLetter{
    id : number;
    title : string;
    description : string;
    letterImage : string;
    letterTypeId : number;
    letterType : string;
}
export interface AddNewsLetter{
    id : number;
    title : string;
    description : string;
    letterImage : string;
    letterTypeId : number;
    newsLetterGallery :any;
}
export interface SubscribedUser{
    id : number;
    emailAddress : string;
    creationTime : Date ;
}
export interface ScheduleNewsLetter{
    id : number;
    contactID : number;
    newsLetterSubscriptionId : number;
    scheduleDate : Date ;
    statusTypeId : number;
    emailAddress : string[]
}
export abstract class NewsLetterData{
    abstract getNewsLetters() : Observable<NewsLetter[]>
    abstract deleteNewsLetter(id : number);
    abstract AddNewsLetter(service : AddNewsLetter);
    abstract updateNewsLetter(service : AddNewsLetter);
    abstract getSubscribedUser() : Observable<SubscribedUser[]>
    abstract ScheduleNewsLetter(schedule : ScheduleNewsLetter);
}