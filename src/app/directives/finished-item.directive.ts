import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[isFinish]',
})
export class FinishDirective {
    
  constructor(private element: ElementRef) {}

  @Input() 
  set isFinish(value: boolean) {
    if(value) {
        this.element.nativeElement.style.textDecoration = 'line-through';
        this.element.nativeElement.style.backgroundColor = '#0ee355';
    }
  }
}
