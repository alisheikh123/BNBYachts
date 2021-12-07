
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { BoatTypes } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-boat-listing',
  templateUrl: './host-boat-listing.component.html',
  styleUrls: ['./host-boat-listing.component.scss']
})
export class HostBoatListingComponent implements OnInit {
  hostBoats: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  BOAT_TYPE = BoatTypes;

  constructor(private service: ReservationService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.getHostBoats().subscribe((res: any) => {
      this.hostBoats = res;
    });
  }
  isBoatActive(item: any) {

    this.service.updateBoatStatus(item.id).subscribe((res: any) => {
      item.isActive = !item.isActive;
      this.toastr.success('Boat Status successfully Changed.', 'Success');

    });
  }


}
