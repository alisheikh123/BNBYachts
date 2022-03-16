import { Injectable } from '@angular/core';
import { ServiceProviderData } from '../../../../shared/interfaces/ServiceProviderData';
import { ServiceProviderApi } from '../api/service-provider.api';

@Injectable()
export class ServiceProviderService extends ServiceProviderData {

  constructor(private api: ServiceProviderApi) {
    super();
  }
  GetServiceProviderList() {
    return this.api.getServiceProviderList();
  }
  GetServiceProviderById(id: number) {
    return this.api.getServiceProviderById(id);
  }
  SuspendServiceProvider(id : number){
    return this.api.SuspendServiceProvider(id);
  }
}
