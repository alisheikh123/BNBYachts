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
  constructor(private service:AllHostBoatsService) { }

  ngOnInit(): void {
    this.service.getAllCharters().subscribe((res: any) => {
      this.hostCharters = [...new Map(res.map((item:any) =>
        [item['boatId'], item])).values()];
    });
  }

}
