import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllHostBoatsService } from 'src/app/core/host/all-host-boats.service';
import {BoatTypesId } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-events-listing',
  templateUrl: './all-events-listing.component.html',
  styleUrls: ['./all-events-listing.component.scss']
})
export class AllEventsListingComponent implements OnInit {

  hostEvents:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  BOAT_TYPE = BoatTypesId;
  queryParams = {
    page: 1,
    pageSize: 5
  };
  totalRecords: number = 0;
  constructor(private service:AllHostBoatsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getHostEvents();

  }
  getHostEvents(){
    this.service.getAllEvents(this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.hostEvents = res?.data;        
        this.totalRecords = res?.totalCount;
    });
  }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getHostEvents();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getHostEvents();
  }
  isEventActive(item:any){
    this.service.updateEventIdStatus(item?.id).subscribe((res: any) => {
      item.isActive = !item.isActive;
      this.toastr.success('Event Status successfully Changed.', 'Success');
    });
  }


}
