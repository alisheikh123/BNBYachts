import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable()

export class ContractsService {
  apiUrl: string = environment.BOOKING_API_URL + '/api/app/contracts/';
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  addContracts(contractForm: any) {
    return this.http.post(this.apiUrl + 'contract', contractForm).pipe(
      catchError(this.errorService.handleError));
  }
  getContracts(filter: any) {
    return this.http.get(this.apiUrl + 'contracts?BoatId=' + filter?.boatId + '&StatusId=' + filter.statusId
      + '&ServiceType=' + filter.serviceType + '&Month=' + filter.month + '&Year=' + filter.year + '&PageNo=' + filter?.pageNo +
      '&PageSize=' + filter.pageSize+'&isHost='+filter.isHost).pipe(
        catchError(this.errorService.handleError));
  }
  getContractById(contractId:number) {
    return this.http.get(this.apiUrl + 'contract-by-id/'+contractId).pipe(
        catchError(this.errorService.handleError));
  }
  reject(contractId:number,reason:string) {
    return this.http.post(this.apiUrl + 'reject-contract/'+contractId+'?reason='+reason,null).pipe(
        catchError(this.errorService.handleError));
  }

  accept(contractId:number) {
    return this.http.post(this.apiUrl + 'accept-contract/'+contractId,null).pipe(
        catchError(this.errorService.handleError));
  }
}
