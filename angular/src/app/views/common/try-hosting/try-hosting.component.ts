import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-try-hosting',
  templateUrl: './try-hosting.component.html',
  styleUrls: ['./try-hosting.component.scss']
})
export class TryHostingComponent implements OnInit {
  boats: any[];
  carouselSettings: any[];
  page: number;
  constructor() {    
    this.carouselSettings = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.boats = [
      '../../../../assets/images/card-1.png',
      '../../../../assets/images/card-1.png',
      '../../../../assets/images/card-1.png',
      '../../../../assets/images/card-1.png',
      '../../../../assets/images/corporate.png',
      '../../../../assets/images/card-3.png',
      '../../../../assets/images/card-3.png'
    ];
  }
}
