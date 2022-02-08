import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent implements OnInit {
    constructor(public app: AppComponent, private router: Router) { }

    ngOnInit() {
    }
}
