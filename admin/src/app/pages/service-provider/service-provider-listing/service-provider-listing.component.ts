import { SpStatusComponent } from './../sp-status/sp-status.component';
import { ServiceProvider } from './../../../shared/interfaces/ServiceProviderData';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ServiceProviderData } from '../../../shared/interfaces/ServiceProviderData';
import { ServiceProviderType } from '../../../shared/enums/serviceProviderType';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';

@Component({
  selector: 'ngx-service-provider-listing',
  templateUrl: './service-provider-listing.component.html',
  styleUrls: ['./service-provider-listing.component.scss']
})
export class ServiceProviderListingComponent implements OnInit {
  source: ServiceProvider[];
  serviceProviderType  = ServiceProviderType;
  profile : string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  settings = {
    actions: {
      add: false,
      edit:false,
      delete: false,
      position: 'right',
      custom: [
      { 
        name: 'userDetails', 
        title: '<i class="nb-compose"></i>' 
      }],
    },
    columns: {
      userImagePath:{
        title :'Image',
        type : 'html',
        width: '10%',
        valuePrepareFunction: (userImagePath) => { 
          this.profile = this.assetsUrlProfile + (userImagePath || this.USER_DEFAULTS.avatar);
          return `<img src="${this.profile}" alt="Profile" height="25" width="50"/>`;
        } 
      },
      userName: {
        title: 'Name',
        type: 'string',
      },
      companyName: {
        title: 'Company',
        type: 'string',
      },
      serviceProviderName: {
        title: 'Type',
        type: 'string',
      },
      fee: {
        title: 'Fee',
        type: 'boolean',
      },
     isActive: {
        title: 'Status',
        type: 'custom',
        filter: false,
        renderComponent: SpStatusComponent,
        valuePrepareFunction: (value, row, cell) => {
            return row;
        },
      },
  }
};
  constructor(private serviceProviderService: ServiceProviderData , private datePipe : DatePipe, private router : Router, private dialogService : NbDialogService) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter() {
    this.serviceProviderService.GetServiceProviderList().subscribe((res : any) =>{
      this.source = res.data;
      this.source.forEach(element =>{
        if (element.serviceProviderType == this.serviceProviderType.Captain) {
          element.serviceProviderName = "Captain";
        }else if (element.serviceProviderType == this.serviceProviderType.Cleaning) {
          element.serviceProviderName = "Cleaning";
        }else if (element.serviceProviderType == this.serviceProviderType.Management) {
          element.serviceProviderName = "Management";
        }
      })
    });    
  }
  onCustomAction(event){
    // this.router.navigate([`pages/service/service/${event.data.id}`]);
  }
}
