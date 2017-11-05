import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[mmr-root]',
})
export class MMRDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
