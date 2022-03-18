import { ServiceFeeApi } from './api/setting.api';
import { ServiceFeeService } from './services/setting.service';
import { ServiceProviderApi } from './api/service-provider.api';
import { ServiceProviderService } from './services/service-provider.service';
import { MarketApi } from './api/market.api';
import { MarketService } from './services/market.service';
import { FaqsApi } from './api/faqs.api';
import { FaqsService } from './services/faqs.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BoatsApi } from './api/boats.api';
import { DisputesApi } from './api/disputes.api';
import { DisputeService } from './services/dispute.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountryData } from '../../interfaces/common/countries';
import { SettingsData } from '../../interfaces/common/settings';
import { DisputesData } from '../../../shared/interfaces/IDispute';
import { UserActivityService } from '../../mock/user-activity.service';
import { OrdersChartService } from '../../mock/orders-chart.service';
import { TrafficListService } from '../../mock/traffic-list.service';
import { ProfitChartService } from '../../mock/profit-chart.service';
import { UserActivityData } from '../../data/user-activity';
import { OrdersChartData } from '../../data/orders-chart';
import { ProfitChartData } from '../../data/profit-chart';
import { TrafficListData } from '../../data/traffic-list';
import { OrdersProfitChartData } from '../../data/orders-profit-chart';
import { EarningService } from '../../mock/earning.service';
import { OrdersProfitChartService } from '../../mock/orders-profit-chart.service';
import { TrafficBarService } from '../../mock/traffic-bar.service';
import { ProfitBarAnimationChartService } from '../../mock/profit-bar-animation-chart.service';
import { EarningData } from '../../data/earning';
import { TrafficBarData } from '../../data/traffic-bar';
import { ProfitBarAnimationChartData } from '../../data/profit-bar-animation-chart';
import { TemperatureHumidityService } from '../../mock/temperature-humidity.service';
import { SolarService } from '../../mock/solar.service';
import { TrafficChartService } from '../../mock/traffic-chart.service';
import { StatsBarService } from '../../mock/stats-bar.service';
import { CountryOrderService } from '../../mock/country-order.service';
import { StatsProgressBarService } from '../../mock/stats-progress-bar.service';
import { SecurityCamerasService } from '../../mock/security-cameras.service';
import { VisitorsAnalyticsService } from '../../mock/visitors-analytics.service';
import { TemperatureHumidityData } from '../../data/temperature-humidity';
import { SolarData } from '../../data/solar';
import { TrafficChartData } from '../../data/traffic-chart';
import { CountryOrderData } from '../../data/country-order';
import { StatsBarData } from '../../data/stats-bar';
import { VisitorsAnalyticsData } from '../../data/visitors-analytics';
import { StatsProgressBarData } from '../../data/stats-progress-bar';
import { SecurityCamerasData } from '../../data/security-cameras';
import { ElectricityService } from '../../mock/electricity.service';
import { ElectricityData } from '../../data/electricity';
import { UserData } from '../../data/users';
import { UserService } from '../../mock/users.service';
import { BoatUserData } from '../../../shared/interfaces/BoatUser';
import { BoatsData } from '../../../shared/interfaces/Boats';
import { BoatsService } from './services/boats.service';
import { FaqsData } from '../../../shared/interfaces/Faqs';
import { MarketData } from '../../../shared/interfaces/Market';
import { ServiceProviderData } from '../../../shared/interfaces/ServiceProviderData';
import { ServiceFeeData } from '../../../shared/interfaces/settings';

const API = [UsersApi,DisputesApi,BoatsApi, FaqsApi, MarketApi,ServiceProviderApi, ServiceFeeApi,HttpService];

const SERVICES = [
  { provide: DisputesData, useClass: DisputeService },
  { provide: BoatUserData, useClass: UsersService },
  { provide: BoatsData, useClass: BoatsService },
  { provide: UserData, useClass: UserService },
  { provide : FaqsData, useClass : FaqsService},
  { provide : MarketData, useClass : MarketService},
  { provide : ServiceProviderData, useClass : ServiceProviderService},
  { provide : ServiceFeeData, useClass : ServiceFeeService},

  { provide: UserActivityData, useClass: UserActivityService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ElectricityData, useClass: ElectricityService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: CountryOrderData, useClass: CountryOrderService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
];

@NgModule({
  imports: [
  ],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
