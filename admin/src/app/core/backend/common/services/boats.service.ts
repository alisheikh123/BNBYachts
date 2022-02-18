import { BoatsApi } from './../api/boats.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoatsData, BoatsDetail } from '../../../../shared/interfaces/Boats';

@Injectable()
export class BoatsService extends BoatsData {

  constructor(private api: BoatsApi) {
    super();
  }
  getBoatsByUserId(userId: string): Observable<BoatsDetail[]> {
    return this.api.getBoatsByUserId(userId);
}
}
