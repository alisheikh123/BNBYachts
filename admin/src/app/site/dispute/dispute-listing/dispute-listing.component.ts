import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DisputeService } from 'src/app/services/site/dispute.service';
import { IDispute } from 'src/app/shared/interfaces/IDispute';
import { PaginationSettingsEnum } from 'src/app/shared/pagination/PaginationSettingsEnum';

@Component({
  selector: 'app-dispute-listing',
  templateUrl: './dispute-listing.component.html'
})

export class DisputeListingComponent implements OnInit {
  public dispute! : IDispute[];
  public pageNumber: number = 1;
  public pageSize!: number;
  public totalItems!: number;
  public searchTerm! : string;
  pagination = PaginationSettingsEnum;
  constructor(public app: AppComponent, private disputeService: DisputeService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    if (reset) {
      this.searchTerm = "";
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pageNumber != null) ? this.pageNumber : this.pagination.pageNumber,
      pageSize: (this.pageSize != null) ? this.pageSize : this.pagination.pageSize,
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
