import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationContractComponent } from './reservation-contract/reservation-contract.component';
import { ReservationComponent } from './reservation/reservation.component';


const routes: Routes = [
    {
        path: "", component: ReservationComponent
    },
      {
        path: "reservation", component:ReservationContractComponent
      },
    //   {
    //     path: "cleaning-onboarding", component:CleaningOnBoardingComponent
    //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
