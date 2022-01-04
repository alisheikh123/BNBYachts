import { Component, OnInit } from '@angular/core';
import { AllHostBoatsService } from 'src/app/core/host/all-host-boats.service';
import { BoatTypesId } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-charters-listing',
  templateUrl: './all-charters-listing.component.html',
  styleUrls: ['./all-charters-listing.component.scss']
})
export class AllChartersListingComponent implements OnInit {
  hostCharters:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  BOAT_TYPE = BoatTypesId;
  queryParams = {
    page: 1,
    pageSize: 5
  };
  totalRecords: number = 0;
  constructor(private service:AllHostBoatsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getHostCharters();

  }
  getHostCharters(){
    this.service.getAllCharters(this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.hostCharters = res?.data;
        this.totalRecords = res?.totalCount;
    });
  }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getHostCharters();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getHostCharters();
  }
  isCharterActive(item: any) {
    this.service.updateCharterStatus(item?.id).subscribe((res: any) => {
      item.isActive = !item.isActive;
      this.toastr.success('Charter Status successfully Changed.', 'Success');
    });
  }

}
