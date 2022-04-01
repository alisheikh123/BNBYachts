import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserRoles } from '../../../shared/enums/userRoles';
import { BoatUser, BoatUserData } from '../../../shared/interfaces/BoatUser';
import { StatusComponent } from '../../user/status/status.component';

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
      columnTitle :"Action",
      add: false,
      edit:false,
      delete: false,
      custom: [{ 
        name: 'userDetails', 
        title: '<i class="nb-compose"></i>'  }
      ],
      position: 'right'
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        width:'20%'
      },
      email: {
        title: 'Email',
        type: 'string',
        width:'25%'
      },
      emailConfirmed: {
        title: 'Email Verified',
        type: 'boolean',
        width:'15%',
        valuePrepareFunction: (emailConfirmed) => {
          return emailConfirmed ? 'Yes' : 'No';
      },
      },
      phoneNumber: {
        title: 'Phone',
        type: 'string',
        width:'10%'
      },
      phoneNumberConfirmed: {
        title: 'Phone Verified',
        type: 'boolean',
        width:'15%',
        valuePrepareFunction: (phoneNumberConfirmed) => {
          return phoneNumberConfirmed ? 'Yes' : 'No';
      },
      },
      isActive: {
        title: 'Status',
        type: 'custom',
        width:'10%',
        filter: false,
        renderComponent: StatusComponent,
        valuePrepareFunction: (value, row, cell) => {
            return row;
        },
      },
    },
  };
  constructor(private userService: BoatUserData, private datePipe : DatePipe, private router : Router) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter() : any {
    this.userService.getBoatUsers(this.Roles.HOST).subscribe((res) =>{
      this.source = res;
    });    
  }
  onCustomAction(event){
    this.router.navigate([`pages/host/host/${event.data.id}`]);
  }
}
