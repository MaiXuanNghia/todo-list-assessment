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
        //this.element.nativeElement.children[0].style.filter = 'blur(2px)';
        for(let el of this.element.nativeElement.children) {
          if(el.getAttribute('id') !== 'not-blur') {
            el.style.filter = 'blur(1px)';
          }
        }
    }
  }
}
