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
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';
import { SignleActionComponent } from '../../../shared/common/signle-action/signle-action.component';

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
    actions: false,
    columns: {
      serviceProviderName: {
        title: 'Type',
        type: 'string',
      },
      userName: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phoneNumber: {
        title: 'Phone',
        type: 'string',
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
      operation:{
        title:"",
        type: 'custom',
        filter : false,
        renderComponent: SignleActionComponent,
        onComponentInitFunction:(instance) => {
        instance.actionEmitter.subscribe(row => {
          instance.dataEmitter.subscribe(data => {
            if (row == 'onViewAction') {
              this.onCustomAction(data.id);
            }
          }) 
        });
       }
     }
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
  onCustomAction(id){
    this.router.navigate([`pages/service/service/${id}`]);
  }
}
