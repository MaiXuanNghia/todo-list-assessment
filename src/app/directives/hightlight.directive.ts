import { Directive, ElementRef, Input } from "@angular/core";



@Directive({
    selector: '[deadlineHightLight]'
})
export class HightLightDirective {

    constructor(private element: ElementRef) {

    }

    private setHightlightColor(color: string) {
        this.element.nativeElement.style.backgroundColor = color;
    }

    @Input()
    set deadlineHightLight(dueDate: Date) {
        const today = new Date().getDate();
        const deadline = new Date(dueDate).getDate();
        const deadlineCount = deadline - today;
        if(deadlineCount <= 1 && deadlineCount > 0) {
            this.setHightlightColor('#e3c70e');
        }
        else if (deadlineCount <= 0) {
            this.setHightlightColor('#e30e2a');
        }
    }

}