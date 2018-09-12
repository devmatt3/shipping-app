import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid';
import { TrailerService } from '../../services/trailer.service';
import { Observable } from 'rxjs';
import { Trailer } from '../../models/trailer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
 
  @ViewChild('agGrid') agGrid: AgGridNg2;
  public gridOptions: GridOptions;
  title = 'Test App Details';
  rowData: Trailer[]=[];
  private gridApi;
  private gridColumnApi;
  public getContextMenuItems;
  public overlayLoadingTemplate;
  public overlayNoRowsTemplate;
  trailers: Observable<any>;
  

  constructor(public http: HttpClient, public trailerService: TrailerService, public router: Router) {
    this.checkReload();
    var gridSize = 4;
    this.gridOptions = {
      enableFilter: true,
      floatingFilter: true,
      rowHeight: gridSize * 6,
      headerHeight: gridSize * 7,
      floatingFiltersHeight: gridSize * 7,
      columnDefs: [
        { headerName: 'Trailer #', field: 'trailerNumber',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, rowDrag: true},
        { headerName: 'Status', field: 'status',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'ETA Date', field: 'projCompletionDate', comparator: dateComparator, filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'ETA Time', field: 'projCompletionTime',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'Current Loc', field: 'currentLocation',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'Closed Dest', field: 'closedDest',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'Cube %', field: 'cube', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'Weight', field: 'weight', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        { headerName: 'Bills', field: 'noOfBills', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}}
      ]
    };
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading...</span>';
      this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">No data to show</span>';
    
   function dateComparator(date1, date2) {
     var date1Number = monthToComparableNumber(date1);
     var date2Number = monthToComparableNumber(date2);
     if (date1Number === null && date2Number === null) {
       return 0;
     }
     if (date1Number === null) {
       return -1;
     }
     if (date2Number === null) {
       return 1;
     }
     return date1Number - date2Number;
   }
     function monthToComparableNumber(date) {
     if (date === undefined || date === null || date.length !== 10) {
       return null;
     }
     var yearNumber = date.substring(6, 10);
     var monthNumber = date.substring(3, 5);
     var dayNumber = date.substring(0, 2);
     var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
     return result;
   }    
  }   

  ngOnInit(){
  
  }

  /**
   * Used to autosize grid
   */
  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  onGridReady(params) {
    this.gridOptions.api.showLoadingOverlay();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.trailers = this.trailerService.trailers;
    this.trailers.subscribe(results => {
      this.rowData = results.trailers;
    });
    params.api.sizeColumnsToFit();    
  }

  /**
   * Clears filters and sorting for grid
   */
  clearFilters(){
    this.gridOptions.api.setFilterModel(null);
    this.gridOptions.api.setSortModel(null);
    this.gridOptions.api.refreshCells();
  }

  /**
   * Used for reload routing on detail page if info is invalid.
   */
  checkReload(){
    if(this.trailerService.planningSvc === undefined || this.trailerService.closedDest === undefined){
      this.router.navigate(['']);
    }
  }

  /** 
   * Exports data from shipment details
  */
  onBtnExport(){
    var params = {
      fileName: this.trailerService.planningSvc + '_' + this.trailerService.closedDest
    }
    this.gridApi.exportDataAsCsv(params);
  }
}