import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { WishlistTypes } from 'src/app/shared/enums/wishlist.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishLists: any[] = [];
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  selectedWishListType = 1;

  constructor(private service: WishlistsService, config: NgbRatingConfig, private toastr: ToastrService) {
    config.readonly = true;
    config.max = 5;
  };
  WISHLIST_TYPES = WishlistTypes;

  ngOnInit(): void {
    this.getMyWishlists(this.WISHLIST_TYPES.Boatel);
  }

  getMyWishlists(wishListType: number) {
    this.service.getUserWishlists(wishListType).subscribe((res: any) => {
      this.wishLists = res?.data;
    });
  }
  filterWishlist(wishListType: number) {
    this.selectedWishListType = wishListType;
    this.getMyWishlists(wishListType);
  }

  removeToWishlist(id: number, index: number) {
    this.service.removeToWishlist(id, this.selectedWishListType).subscribe((res: any) => {
      this.wishLists.splice(index, 1);
      this.toastr.success("Boat removed from wishlists.", "Wishlists");
    });
  }

}
