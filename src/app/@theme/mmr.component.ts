import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MMRDirective} from "./mmr.directive";
import {MMRComponetRegisty, MMRViewComponent} from "./mmr.service";

@Component({
  selector: 'mmr-view',
  template: `<ng-template mmr-root></ng-template>`
})
export class MMRComponent implements OnInit {

  @Input() options;

  @ViewChild(MMRDirective) mmrRoot: MMRDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private mmrComponetRegisty: MMRComponetRegisty,
  ) { }


  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let viewContainerRef = this.mmrRoot.viewContainerRef;
    viewContainerRef.clear();
    if (this.options.children) {
      this.options.children.forEach( c => {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mmrComponetRegisty.getComponetType(c.type));
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<MMRViewComponent>componentRef.instance).setData(c === null ? {} : c)
      });
    }

  }

}
