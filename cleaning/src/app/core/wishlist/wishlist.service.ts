import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  boatApiURl: string = environment.BOAT_API_URL+'/api/app/wishlist';
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  getUserWishlists(wishlistType:number) {
    return this.http.get(this.boatApiURl + '/user-wishlist?wishlistType='+wishlistType).pipe(
      catchError(this.errorService.handleError));
  }

  addToWishlist(boatId:number,wishlistType:number) {
    return this.http.post(this.boatApiURl +'/'+ boatId+ '/to-wishlist?wishlistType='+wishlistType,null).pipe(
      catchError(this.errorService.handleError));
  }
  removeToWishlist(boatId:number,wishlistType:number) {
    return this.http.delete(this.boatApiURl + '/' + boatId + '/to-wishlist'+'?wishlistType='+wishlistType).pipe(
      catchError(this.errorService.handleError));
  }
}
