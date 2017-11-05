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
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mmrComponetRegisty.getComponetType("card"));

    let viewContainerRef = this.mmrRoot.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    console.log(componentRef);
    console.log("options", this.options);
   (<MMRViewComponent>componentRef.instance).setData(this.options === null ? {} : this.options)
  }

}
