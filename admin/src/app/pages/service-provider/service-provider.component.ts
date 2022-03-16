import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-service-provider',
  template: `<router-outlet></router-outlet>`,
})
export class ServiceProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
