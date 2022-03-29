import { Injectable } from '@angular/core';
import { AddServiceFee, ServiceFee, ServiceFeeData } from '../../../../shared/interfaces/settings';
import { ServiceFeeApi } from '../api/setting.api';

@Injectable()
export class ServiceFeeService extends ServiceFeeData {
  constructor(private api: ServiceFeeApi) {
    super();
  }
  getServiceFees() {
    return this.api.getServiceFee();    
  }
  deleteServiceFee(id : number){
    return this.api.deleteServiceFee(id); 
  }
  AddServiceFee(service : AddServiceFee) {
    return this.api.AddServiceFee(service);    
  }
  UpdateServiceFee(service : AddServiceFee){
    return this.api.updateServiceFee(service); 
  }
  getServiceFeeByBoatType(BoatTypeId : number) {
    return this.api.getServiceFeeByBoatType(BoatTypeId);    
  }
}