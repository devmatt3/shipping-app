import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocusng]'
})
export class AutofocusngDirective implements OnInit{ 

    constructor(private elementRef: ElementRef) { 
    };
  
    ngOnInit(): void {
     setTimeout(() => {
      this.elementRef.nativeElement.focus();
     });
    } 
  }