import { ServiceProvider } from './../../../shared/interfaces/ServiceProviderData';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';
import { ServiceProviderData } from '../../../shared/interfaces/ServiceProviderData';

@Component({
  selector: 'ngx-service-provider-detail',
  templateUrl: './service-provider-detail.component.html',
  styleUrls: ['./service-provider-detail.component.scss']
})
export class ServiceProviderDetailComponent implements OnInit {

  serviceProvider : ServiceProvider;
  latest_date : string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  constructor(private serviceProviderService : ServiceProviderData,private route : ActivatedRoute, private datePipe : DatePipe) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.UserDetail(Number(id));
  }
  UserDetail(id : number){
    this.serviceProviderService.GetServiceProviderById(id).subscribe((res) =>{
      this.serviceProvider = res;
    }); 
  }
}
