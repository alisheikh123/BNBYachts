import { Router } from '@angular/router';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { Component, OnInit } from '@angular/core';
import { FeaturedCities } from 'src/app/shared/interface/featuredCities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured-cities',
  templateUrl: './featured-cities.component.html',
  styleUrls: ['./featured-cities.component.scss']
})
export class FeaturedCitiesComponent implements OnInit {
  featuredCities : FeaturedCities[];
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/cities/';

  constructor(private boatService : BoatService, private router : Router) { }

  ngOnInit(): void {
    this.getFeaturedCities();
  }
  getFeaturedCities(){
    this.boatService.getFeaturedCities().subscribe((res : any)=>{
      this.featuredCities = res;
    })
  }
  GoToFeatureCityMap(){
    this.router.navigate(['host'])
  }
}
