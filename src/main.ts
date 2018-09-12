import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import {LicenseManager} from "ag-grid-enterprise/main";
//LicenseManager.setLicenseKey("Evaluation_License_Valid_Until__16_September_2018__MTUzNzA1MjQwMDAwMA==b7ecc78983c1bf33b5eb3682cc62cfaa");
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
