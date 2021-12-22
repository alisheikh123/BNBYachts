import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination.component';

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [FormsModule,NgbModule],
exports:[PaginationComponent]
})
export class PaginationModule { }
