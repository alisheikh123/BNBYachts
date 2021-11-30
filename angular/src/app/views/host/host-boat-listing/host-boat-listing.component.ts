import { BoatType } from './../../../shared/enums/yacht-search.constant';
import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-host-boat-listing',
  templateUrl: './host-boat-listing.component.html',
  styleUrls: ['./host-boat-listing.component.scss']
})
export class HostBoatListingComponent implements OnInit {
  hostBoats: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  BOAT_TYPE = BoatType;
  constructor(private service: ReservationService) { }

  ngOnInit(): void {
    this.service.getHostBoats().subscribe((res: any) => {
      this.hostBoats = res;
    });
  }

}
