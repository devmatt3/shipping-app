import { Component } from '@angular/core';
import { MeetPointService } from './services/meetpoint.service';
import { HeaderService, Page} from 'internal-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
    constructor(public headerService : HeaderService){
      /**
       * Below information is used to populate external header
       */
      const search = new Page();
      search.title = 'Test App';
      search.routerLink = 'search';
      headerService.pageList.push(search);
      headerService.applicationGroupTitle = 'Test app group';
  }
}
