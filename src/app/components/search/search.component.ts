import { Component, OnInit, Injectable, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MeetPointService } from '../../services/meetpoint.service';
import { TrailerService } from '../../services/trailer.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit{
  @Input('timeType') timeType: string = 'time';
  currentDate: Date = new Date();
  @Output('searchDate') searchDate: Date = new Date();
  selectedDate: Date = new Date();
  searchTimes: number[] = [0, 2, 4, 6, 8, 10, 12];
  searchDates: String[] = [];
  
  searchForm = new FormGroup({
    planningSvc: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    closedDest: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    searchTime: new FormControl(0, Validators.required)    
  });
  filteredOptionssc: Observable<string[]>;
  filteredOptionsdest: Observable<string[]>;
  svcOptions:string[] = [];
  meetpointOptions:string[]=[];
  maxDate: Date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + 4);

  constructor(public meetPointService: MeetPointService, 
    public trailerService: TrailerService, 
    private router: Router) { 
    meetPointService.serviceCenters.subscribe(results =>{
      this.svcOptions = results.svcCodeList;
    });

    meetPointService.meetPoints.subscribe(results => {
      this.meetpointOptions = results.meetPointCodeList;
    });
  }
  
  ngOnInit() {
    this.filteredOptionssc = this.searchForm.get('planningSvc').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val, 'svc'))
      );
      this.filteredOptionsdest = this.searchForm.get('closedDest').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val, 'meetpoint'))
        );
        this.setDateList();
  }

  /**
   * Filters input service center values.
   * @param val 
   * @param optionsType 
   */
  filter(val: string, optionsType: string): string[] {
    if(optionsType === 'svc'){
      return this.svcOptions.filter(option =>
        option.toLowerCase().startsWith(val.toLowerCase()));
    }else{
      return this.meetpointOptions.filter(option =>
        option.toLowerCase().startsWith(val.toLowerCase()));
    }
  }

  /**
   * If validation passed then send information and navigate to details
   */
  submit():void{
   this.trailerService.getTrailers(this.planningSvc.value, this.closedDest.value, 0);
   this.router.navigate(['/detail']);
  }

  /**
   * Checks to see if planning svc and closed dest match.
   */
  planningSvcAndClosedDestMatch(){
    return this.planningSvc.value === this.closedDest.value;
  }

  /**
   * Clears value of passed form control
   * @param fc 
   */
  clearValue(fc: FormControl){
    fc.setValue('');
  }

  /**
   * Validates planning svc user input
   */
  planningSvcValidation() {
    if (this.planningSvc.value !== '') {
      this.planningSvc.setValue(this.planningSvc.value.toLocaleUpperCase());
      if (!this.svcOptions.includes((this.planningSvc.value as string))) {
        this.planningSvc.setErrors({
          planningSvcInvalid: true
        });
      } else {
        if (this.planningSvc.value === this.closedDest.value) {
          this.planningSvc.setErrors({
            planningSvcMatchesClosedDest: true
          });
        } else {
          if ((this.closedDest.value as string) !== '') {
            if(!this.closedDest.hasError('closedDestInvalid')){
              this.closedDest.setErrors(null);
            }
          }
        }
      }
    }
  }

  /**
   * Validates closedDest user input
   */
  closedDestValidation() {
    if (this.closedDest.value !== '') {
      this.closedDest.setValue(this.closedDest.value.toLocaleUpperCase());
      if (!this.meetpointOptions.includes((this.closedDest.value as string))) {
        this.closedDest.setErrors({
          closedDestInvalid: true
        });
      } else {
        if (this.closedDest.value === this.planningSvc.value) {
          this.closedDest.setErrors({
            closedDestMatchesPlanningSvc: true
          });
        } else {
          if ((this.planningSvc.value as string) !== '') {
            if(!this.planningSvc.hasError('planningSvcInvalid')){
              this.planningSvc.setErrors(null);
            }
          }
        }
      }
    }
  }

  /**
   * Builds the date list
   */
  setDateList(){
    for(let times = 0; times <= 12; times = times + 2 ){
      var tempDate = new Date();
      tempDate.setHours(tempDate.getHours() + times);
      this.searchDates.push(times + " Hours - " + tempDate.toLocaleString());
    }
  }

  /**
   * Changes time based on selection
   */
  searchTimeChange(){
    this.searchDate.setDate(this.currentDate.getDate());
    this.searchDate.setHours(this.currentDate.getHours() + this.searchTime.value);
  }

  get planningSvc(){
    return this.searchForm.get('planningSvc') as FormControl;
  }

  get closedDest(){
    return this.searchForm.get('closedDest') as FormControl;
  }

  get searchTime(){
    return this.searchForm.get('searchTime') as FormControl;
  }
}
