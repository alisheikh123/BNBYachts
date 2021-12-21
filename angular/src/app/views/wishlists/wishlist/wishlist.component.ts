import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishLists : any[] = [];
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  
  constructor(private service:WishlistsService,config: NgbRatingConfig,private toastr:ToastrService) {
    config.readonly = true;
    config.max = 5;
   }

  ngOnInit(): void {
    this.getMyWishlists();
  }

  getMyWishlists(){
    this.service.getUserWishlists().subscribe((res:any)=>{
      this.wishLists = res?.data;
    });
  }

  removeToWishlist(id:number,index:number){
    this.service.removeToWishlist(id).subscribe((res:any)=>{
      this.wishLists.splice(index,1);
      this.toastr.success("Boat removed from wishlists.","Wishlists");
    });
  }

}
