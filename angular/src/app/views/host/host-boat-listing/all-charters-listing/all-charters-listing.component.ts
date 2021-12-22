import { Component, OnInit } from '@angular/core';
import { AllHostBoatsService } from 'src/app/core/host/all-host-boats.service';
import { BoatTypesId } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';

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
  constructor(private service:AllHostBoatsService) { }

  ngOnInit(): void {
    this.getHostCharters();

  }
  getHostCharters(){
    this.service.getAllCharters(this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.hostCharters = [...new Map(res?.data.map((item:any) =>
        [item['boatId'], item])).values()];
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
}
