import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class YachtSearchDataService {
  private boats: any = undefined;
  private filters: any = undefined;
  constructor() { }
  getBoats() {
    return this.boats;
  }
  getFilters() {
    return this.filters
  }
  setBoats(boats: any): void {
    this.boats = boats;
  }
  setFilters(filters: any): void {
    this.filters = filters;
  }
  
}
