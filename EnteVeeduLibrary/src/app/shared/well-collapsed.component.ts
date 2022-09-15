import { Component } from "@angular/core";

@Component({
    selector : 'well-collapsed',
    template : `<div (click) = 'toggleVisibility()'>
        <h4><ng-content select = "[well-title]"></ng-content></h4>
        <ng-content *ngIf = 'visible'select = "[well-body]"></ng-content>
    </div>`
})
export class WellCollapsedComponent{

    visible : boolean = true;
    toggleVisibility():void{
        this.visible  = !this.visible;
    }

}