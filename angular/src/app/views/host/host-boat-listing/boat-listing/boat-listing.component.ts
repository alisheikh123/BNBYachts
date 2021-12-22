import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllHostBoatsService } from 'src/app/core/host/all-host-boats.service';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { BoatTypes, BoatTypesId } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-listing',
  templateUrl: './boat-listing.component.html',
  styleUrls: ['./boat-listing.component.scss']
})
export class BoatListingComponent implements OnInit {
  hostBoats: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  BOAT_TYPE = BoatTypesId;
  totalRecords: number = 0;
  queryParams = {
    page: 1,
    pageSize: 5
  };
  @Input() showAllBoats: boolean = true;
  constructor(private service: AllHostBoatsService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getHostBoats();

  }
  getHostBoats(){
    this.service.getAllBoats(this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.hostBoats = this.showAllBoats ? res?.data : res?.data.filter((data: any) => data.isBoatelServicesOffered == true);
      this.totalRecords = res?.totalCount;
    });
  }

  isBoatActive(item: any) {
    this.service.updateBoatStatus(item.id).subscribe((res: any) => {
      item.isActive = !item.isActive;
      this.toastr.success('Boat Status successfully Changed.', 'Success');
    });
  }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getHostBoats();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getHostBoats();
  }
}
