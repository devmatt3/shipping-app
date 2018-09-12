import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {JoyrideModule} from 'ngx-joyride';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { HeaderModule} from 'internal-header';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';
import { initializer } from './utils/app-init';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppAuthGuard } from './auth/auth.guard';
import { MeetPointService } from './services/meetpoint.service';
import { TrailerService } from './services/trailer.service';
import { SearchModule } from './components/search/search.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    JoyrideModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HeaderModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production}),
    AgGridModule.withComponents([]),
    HttpClientModule,
    //  KeycloakAngularModule,
    SearchModule
  ],
  providers: [
    // AppAuthGuard,
    MeetPointService,
    TrailerService,
    // {
    //   provide: APP_INITIALIZER,
    //     useFactory: initializer,
    //     multi: true,
    //     deps: [KeycloakService]
    //   }
      {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
