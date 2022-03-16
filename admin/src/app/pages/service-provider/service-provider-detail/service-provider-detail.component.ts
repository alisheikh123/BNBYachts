import { ServiceProvider } from './../../../shared/interfaces/ServiceProviderData';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';
import { ServiceProviderData } from '../../../shared/interfaces/ServiceProviderData';
import { ServiceProviderType } from '../../../shared/enums/serviceProviderType';

@Component({
  selector: 'ngx-service-provider-detail',
  templateUrl: './service-provider-detail.component.html',
  styleUrls: ['./service-provider-detail.component.scss']
})
export class ServiceProviderDetailComponent implements OnInit {

  serviceProvider : ServiceProvider;
  serviceProviderType  = ServiceProviderType;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  constructor(private serviceProviderService : ServiceProviderData,private route : ActivatedRoute, private datePipe : DatePipe) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ServiceProviderDetail(Number(id));
  }
  ServiceProviderDetail(id : number){
    this.serviceProviderService.GetServiceProviderById(id).subscribe((res) =>{
      this.serviceProvider = res.data;
      if (this.serviceProvider.serviceProviderType == this.serviceProviderType.Captain) {
        this.serviceProvider.serviceProviderName = "Captain";
      }else if (this.serviceProvider.serviceProviderType == this.serviceProviderType.Cleaning) {
        this.serviceProvider.serviceProviderName = "Cleaning";
      }else if (this.serviceProvider.serviceProviderType == this.serviceProviderType.Management) {
        this.serviceProvider.serviceProviderName = "Management";
      }
    }); 
  }
}
