import { Component, OnInit } from '@angular/core';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-dropped-services',
  templateUrl: './dropped-services.component.html',
  styleUrls: ['./dropped-services.component.scss']
})
export class DroppedServicesComponent implements OnInit {

  droppedServices: any;
  constructor(private service: ReservationListsService, private boatService: YachtSearchService) { }

  ngOnInit(): void {
    this.getDroppedServices();
  }


  getDroppedServices() {
    this.service.getDroppedServices().subscribe(res => {
      this.droppedServices = res;
      this.droppedServices.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

}
