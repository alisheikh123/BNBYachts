import { DisputeService } from './../../core/backend/common/services/dispute.service';
import { HomeDashboardComponent } from './home-dashboard.component';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../shared/theme.module';
import { FormsModule } from '@angular/forms';
import { StatusCardComponent } from '../dashboard/status-card/status-card.component';
import { TemperatureDraggerComponent } from '../dashboard/temperature/temperature-dragger/temperature-dragger.component';
import { ContactsComponent } from '../dashboard/contacts/contacts.component';
import { TemperatureComponent } from '../dashboard/temperature/temperature.component';
import { KittenComponent } from '../dashboard/kitten/kitten.component';
import { SecurityCamerasComponent } from '../dashboard/security-cameras/security-cameras.component';
import { ElectricityComponent } from '../dashboard/electricity/electricity.component';
import { ElectricityChartComponent } from '../dashboard/electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from '../dashboard/weather/weather.component';
import { SolarComponent } from '../dashboard/solar/solar.component';
import { TrafficComponent } from '../dashboard/traffic/traffic.component';
import { TrafficChartComponent } from '../dashboard/traffic/traffic-chart.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    HomeDashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    TemperatureComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
  ],
  providers:[
     DisputeService
  ]
})
export class HomeDashboardModule { }
