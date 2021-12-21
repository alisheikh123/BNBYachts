import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { environment } from 'src/environments/environment';
import { WishListsRoutingModule } from './wishlists-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { NotFoundModule } from '../common/not-found-component/not-found.module';



@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    NgbModule,
    WishListsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedPipesModule,
    NotFoundModule
  ],
  providers: [WishlistsService]
})
export class WishListsModule { }
