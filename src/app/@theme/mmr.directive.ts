import {Directive, ElementRef, EmbeddedViewRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[mmr-root]',
})
export class MMRDirective {
  constructor(
    public viewContainerRef: ViewContainerRef) { }
}
