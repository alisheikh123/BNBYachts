import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  boatApiURl: string = environment.BOAT_API_URL+'/api/app/wishlist';
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  getUserWishlists() {
    return this.http.get(this.boatApiURl + '/user-wishlist').pipe(
      catchError(this.errorService.handleError));
  }

  addToWishlist(boatId:number) {
    return this.http.post(this.boatApiURl + '/to-wishlist/'+boatId,null).pipe(
      catchError(this.errorService.handleError));
  }
  removeToWishlist(boatId:number) {
    return this.http.delete(this.boatApiURl + '/' + boatId + '/to-wishlist').pipe(
      catchError(this.errorService.handleError));
  }
}
