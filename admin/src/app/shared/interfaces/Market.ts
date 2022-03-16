import { Observable } from 'rxjs';

export interface City{
    id : number
    name : string;
    description : string;
    imagePath : string;
}
export interface AddCity{
    cityData: { fileName: string; };
    id : number
    name : string;
    description : string;
    imagePath : string;
    featuredCityGallery :any;
}
export interface AddMarket{
    id : number
    marketingTypeId : number;
    marketingType : string;
    localLaws : string;
}
export interface Markets{
    id : number
    marketingTypeId : number;
    marketingType : string;
    localLaws : string;
    creationTime : Date;
}
export abstract class MarketData{
    abstract getCities() : Observable<City[]>
    abstract deleteCity(cityid : number);
    abstract AddCity(faqs : AddCity);
    abstract UpdateCity(faqs : AddCity);
    abstract getMarketingPages() : Observable<Markets[]>
    abstract deleteMarketPage(cityid : number);
    abstract AddMarketPage(faqs : AddMarket);
    abstract updateMarketPage(faqs : AddMarket);
}