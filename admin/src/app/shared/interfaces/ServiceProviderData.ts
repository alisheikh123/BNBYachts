export interface ServiceProvider {
   id : number
   userId : string
   companyName : string
   companyProfilePicture : string
   description : string
   location : string
   bio : string
   experience : number
   fee : string
   paymentOption : string
   serviceProviderType : number
   serviceProviderName : string
   fromDate : Date 
   toDate : Date
   accountName : string
   bankName : string
   zipCode : string
   iban : string
   swift : string
   supportiveDoc : string
   avaliableDate : string
   userName : string
   userImagePath : string
   paymentType : string
   isActive : boolean
}
export abstract class ServiceProviderData {
    abstract GetServiceProviderList();
    abstract GetServiceProviderById(id : number);
    abstract SuspendServiceProvider(id : number);
}