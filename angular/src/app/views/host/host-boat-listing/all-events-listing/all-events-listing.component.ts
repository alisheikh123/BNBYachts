import { Component, OnInit } from '@angular/core';
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
  constructor(private service:AllHostBoatsService) { }

  ngOnInit(): void {
    this.service.getAllEvents().subscribe((res: any) => {
      this.hostEvents = [...new Map(res.map((item:any) =>
        [item['boatId'], item])).values()];
    });
  }

}
