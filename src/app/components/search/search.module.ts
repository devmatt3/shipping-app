import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { AutofocusngDirective } from '../../autofocusng.directive';
import { JoyrideModule } from 'ngx-joyride';
import {HeaderService, HeaderModule} from 'internal-header';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    HeaderModule,
    JoyrideModule.forRoot()
        ],
  exports:[SearchComponent
  ],
  providers:[HeaderService],
  declarations: [SearchComponent, AutofocusngDirective]
})
export class SearchModule { }
