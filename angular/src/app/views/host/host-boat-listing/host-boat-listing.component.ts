import { BoatTypes } from 'src/app/shared/enums/yacht-search.constant';

import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/host/reservation.service';
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
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  BOAT_TYPE = BoatTypes;

  constructor(private service: ReservationService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.getHostBoats().subscribe((res: any) => {
      this.hostBoats = res;
    });
  }
  isBoatActive(item: any) {
    item.isActive = !item.isActive;
    this.service.updateBoatStatus(item.id, item.isActive).subscribe((res: any) => {
      this.toastr.success('Boat Status successfully Changed.', 'Success');
    });
  }


}
