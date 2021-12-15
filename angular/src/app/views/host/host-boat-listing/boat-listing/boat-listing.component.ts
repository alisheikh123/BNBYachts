import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { BoatTypes } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-listing',
  templateUrl: './boat-listing.component.html',
  styleUrls: ['./boat-listing.component.scss']
})
export class BoatListingComponent implements OnInit {
  hostBoats: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  BOAT_TYPE = BoatTypes;
  @Input() showAllBoats :boolean = true;
  constructor(private service: ReservationService, private toastr: ToastrService) { 
  }

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
