import { Component, OnInit } from '@angular/core';
import { BoatList } from 'src/app/shared/interface/boatslist';

@Component({
  selector: 'app-try-hosting',
  templateUrl: './try-hosting.component.html',
  styleUrls: ['./try-hosting.component.scss']
})
export class TryHostingComponent implements OnInit {
  boats: BoatList[];
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
      {
        imagePath : '../../../../assets/images/card-1.png',
        description : 'Explore a world where everything is possible, and everything is within your grasp when you charter a yacht.',
      },
      {
        imagePath : '../../../../assets/images/card-1.png',
        description : 'Everyone deserves a day on the water, surrounded by friends, with sea spray in his face, and BnBYachts will provide it. ',
      },
      {
        imagePath : '../../../../assets/images/card-1.png',
        description :'With charter destinations like Bahamas, Miami, San Diego, Vancouver, etc you can virtually charter a yacht and vacation anywhere.',
      },
      {
        imagePath : '../../../../assets/images/card-1.png',
        description: 'Explore a world where everything is possible, and everything is within your grasp when you charter a yacht.',
      },
      {
        imagePath : '../../../../assets/images/corporate.png',
        description :'Everyone deserves a day on the water, surrounded by friends, with sea spray in his face, and BnBYachts will provide it. ',
      },
      {
        imagePath : '../../../../assets/images/card-3.png',
        description :'With charter destinations like Bahamas, Miami, San Diego, Vancouver, etc you can virtually charter a yacht and vacation anywhere.',
      }
    ];
  }
}
