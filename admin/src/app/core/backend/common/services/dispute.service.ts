import { DisputesApi } from './../api/disputes.api';
import { Injectable } from '@angular/core';
import { ChangeStatus, DisputesData, IDispute } from '../../../../shared/interfaces/IDispute';
import { Observable } from 'rxjs';

@Injectable()
export class DisputeService extends DisputesData {

  constructor(private api: DisputesApi) {
    super();
  }
  getDisputesData(): Observable<IDispute[]> {
    return this.api.getDisputes();
  }
  getDisputeById(id: number): Observable<IDispute> {
    return this.api.getDisputeById(id);
  }
  ChangeDisputeStatus(status: ChangeStatus) {
    return this.api.ChangeDisputeStatus(status);
  }
}
