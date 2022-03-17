import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ServiceProviderApi {

  SERVICE_PROVIDER_API_URL = 'api/app/service-provider/'
  constructor(private api: HttpService) {}

  getServiceProviderList(){
      return this.api.get(`${this.SERVICE_PROVIDER_API_URL}service-providers-list`)
  }
  getServiceProviderById(id : number){
    return this.api.get(`${this.SERVICE_PROVIDER_API_URL}${id}/service-provider-by-id`);
  }
  SuspendServiceProvider(id : number){
    return this.api.postwithoutData(`${this.SERVICE_PROVIDER_API_URL}${id}/suspend-service-provider`);
  }
}