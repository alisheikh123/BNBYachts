import { DisputeService } from './../../services/site/dispute.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dispute-listing',
  templateUrl: './dispute-listing.component.html'
})

export class DisputeListingComponent implements OnInit {
  pagination : any;
  public dispute!: any[];
  public roleName!: string;
  public pageNumber: any = 1;
  public pageSize: any;
  public totalItems: any;
  public searchTerm! : string;
  constructor(public app: AppComponent, private disputeService: DisputeService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    if (reset) {
      this.searchTerm = "";
      this.pagination = null;
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pageNumber != null) ? this.pageNumber : 1,
      pageSize: (this.pageSize != null) ? this.pageSize : 10,
    };

    this.disputeService.getDisputeList(searchModel).subscribe((res: any)  => {
      this.dispute = res?.data;
      this.pageSize = res.pageSize;
      this.totalItems = res.totalCount;
    });
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.filter(false);
  }
}
