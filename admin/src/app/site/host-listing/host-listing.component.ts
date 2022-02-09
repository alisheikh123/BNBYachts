import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/shared/enums/userRoles';
import { BoatUser } from 'src/app/shared/interfaces/BoatUser';
import { PaginationSettingsEnum } from 'src/app/shared/pagination/PaginationSettingsEnum';

@Component({
  selector: 'app-host-listing',
  templateUrl: './host-listing.component.html'
})

export class HostListingComponent implements OnInit {
  user!: BoatUser[];
  Roles = UserRoles;
  public pageNumber!: number;
  public pageSize!: number;
  public searchTerm! : string;
  public totalItems!: number;
  pagination = PaginationSettingsEnum;
  constructor(public app: AppComponent, private userService: UserService) {
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
      pagesize: (this.pageSize != null) ? this.pageSize : this.pagination.pageSize,
    };

    this.userService.getBoatsUser(this.Roles.HOST,searchModel).subscribe((res: any)  => {
      this.user = res.data;
      this.pageNumber = res.pageNumber;
      this.pageSize = res.pageSize;
      this.totalItems = res.totalCount;
    });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.filter(false);
  }
}
