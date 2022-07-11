import { Directive, ElementRef, Input } from "@angular/core";
import { Todo } from "../todo.interface";



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
    set deadlineHightLight(todo: Todo) {
        const today = new Date();
        const deadline = new Date(todo.dueDate);
        const deadlineCount = deadline.getDate() - today.getDate();
        console.log(deadlineCount);
        if(today.getMonth() === deadline.getMonth()) {
            if(deadlineCount <= 0) {
                this.setHightlightColor('#e30e2a');
            }
            else if (deadlineCount <= 1  && todo.priority === 3) {
                this.setHightlightColor('#e3c70e');
            }
        }
    }

}