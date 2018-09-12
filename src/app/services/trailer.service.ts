import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable()
export class TrailerService{
    trailers: Observable<any>;
    planningSvc: string;
    closedDest: string;
    searchTime: number;
    constructor(public http: HttpClient){

    }

    /**
     * Gathers service center trailers
     * @param planningSVC 
     * @param dispatchDest 
     * @param searchTime 
     */
    getTrailers(planningSVC: string, dispatchDest: string, searchTime:number){
        this.planningSvc = planningSVC;
        this.closedDest = dispatchDest;
        this.searchTime = searchTime;
        var trailerParams = {'planningServiceCenter': planningSVC, 'dispatchDestination': dispatchDest, 'planningHours':searchTime};
        this.trailers = this.http.post(environment.testServiceEndpoint2 + 'getTrailers', trailerParams);
    }

}