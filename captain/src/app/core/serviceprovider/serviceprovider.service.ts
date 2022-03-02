import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { ServiceProviderDTO } from 'src/app/shared/interface/service-provider/service-providerdto';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';
@Injectable()
export class ServiceProviderService {

    coreApiUrl: string = environment.CORE_API_URL +'/api';
    constructor(private http: HttpClient , private error_service : ErrorService) { }

    createServiceProvider(form: FormData)  {
 
    return this.http.post(this.coreApiUrl + '/app/service-provider/on-boarding', form).pipe(
      catchError(this.error_service.handleError));
  }
  addServiceProviderRole(type: string){
    return this.http.post(this.coreApiUrl + '/app/user/service-provider-role?type='+type, null).pipe(
      catchError(this.error_service.handleError));
  }
  searchServiceProvider(search:any){
    return this.http.post(this.coreApiUrl + '/app/service-provider/search-service-provider',search ).pipe(
      catchError(this.error_service.handleError));
  }
  getServiceProviderById(id:number)
  {
    return this.http.get(this.coreApiUrl + '/app/service-provider/service-provider-by-id/'+id).pipe(
      catchError(this.error_service.handleError));
  }
  isServiceProviderExist(serviceprovidertype: any)
  {
    return this.http.post(this.coreApiUrl + '/app/service-provider/is-service-provider-exist',serviceprovidertype ).pipe(
      catchError(this.error_service.handleError));
  }
}
