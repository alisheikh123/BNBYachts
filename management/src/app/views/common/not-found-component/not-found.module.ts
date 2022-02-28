import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundComponent} from './component/not-found-component';


@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [],
exports:[NotFoundComponent]
  //bootstrap: [HomeComponent]
})
export class NotFoundModule { }
