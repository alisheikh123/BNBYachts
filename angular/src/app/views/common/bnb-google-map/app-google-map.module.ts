import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BnbGoogleMapComponent } from './component/bnb-google-map.component';


@NgModule({
  declarations: [
    BnbGoogleMapComponent,
  ],
  imports: [
    GoogleMapsModule,
    CommonModule 
  ],
exports:[BnbGoogleMapComponent]
})
export class AppGoogleMapModule { }
