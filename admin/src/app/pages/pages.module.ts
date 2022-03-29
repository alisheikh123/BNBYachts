import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ThemeModule } from '../shared/theme.module';
import { HomeDashboardModule } from './home-dashboard/home-dashboard.module';
const PAGES_COMPONENTS = [
  PagesComponent,
];
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeDashboardModule,
    MiscellaneousModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}
