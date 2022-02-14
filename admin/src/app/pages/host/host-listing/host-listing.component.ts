import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoatUserData } from '../../../core/interfaces/common/users';
import { UserService } from '../../../core/mock/user.service';
import { UserRoles } from '../../../shared/enums/userRoles';
import { BoatUser } from '../../../shared/interfaces/BoatUser';
import { PaginationSettingsEnum } from '../../../shared/pagination/PaginationSettingsEnum';

@Component({
  selector: 'app-host-listing',
  templateUrl: './host-listing.component.html',
  styleUrls : ['./host.-listing.component.scss']
})

export class HostListingComponent implements OnInit {
  Roles = UserRoles;
  source: BoatUser[];
  settings = {
    actions: {
      add: false,
      edit:false,
      delete: false,
      custom: [{ 
        name: 'Detail', 
        title: '<i class="nb-compose"></i>' }
      ],
      position: 'right'
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      phoneNumberConfirmed: {
        title: 'Phone Verified',
        type: 'boolean',
      },
      creationTime: {
        title: 'Joining Date',
        type: 'Date',
        valuePrepareFunction: (creationTime) => {
          return this.datePipe.transform(new Date(creationTime), 'MM/dd/yyyy');
      },
      },
    },
  };
  constructor(private userService: BoatUserData, private datePipe : DatePipe) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter() : any {
    this.userService.getBoatUsers(this.Roles.HOST).subscribe((res) =>{
      this.source = res;
    });    
  }
}
