import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class MeetPointService{

    serviceCenters: Observable<any>;
    meetPoints: Observable<any>;
    constructor(public http: HttpClient){
       this.serviceCenters = this.getServiceCenters();
       this.meetPoints = this.getMeetPoints();
    }

    /**
     * Gets service centers from the meet point service
     */
    getServiceCenters(){
        var serviceCenterParams = {'includeContainers': 'false'};
        return this.http.post(environment.testServiceEndpoint1 + 'getServiceCenters', serviceCenterParams);
    }

    /**
     * Gets meet points from the meet point service
     */
    getMeetPoints(){
        var meetPointParms = {};
        return this.http.post(environment.testServiceEndpoint1 + 'getMeetPoints', meetPointParms);
    }

}