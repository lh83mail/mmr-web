import {AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MMRDirective} from "./mmr.directive";
import {MMRComponetRegisty, MMRViewComponent} from "./mmr.service";
import {DataStoreService} from "app/@theme/services/data-store.service";

@Component({
  selector: 'mmr-view',
  template: `<ng-template mmr-root></ng-template>`
})
export class MMRComponent implements OnInit, AfterViewInit {

  @Input() options;

  @ViewChild(MMRDirective) mmrRoot: MMRDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private mmrComponetRegisty: MMRComponetRegisty,
    private dataStoreService: DataStoreService,
  ) {
  }

  componentRef;
  ngOnInit() {
    this.dataStoreService.onDataInit.subscribe(data => {
      console.log(">>>>KKK>>>>", data);
    });
    this.loadComponent();
  }


  ngAfterViewInit(): void {
    console.log("ngAfterViewInit>>>>>", this.options)
  }

  loadComponent() {

    let viewType = this.mmrComponetRegisty.getComponetType(this.options.type);
    if (viewType == null) {
      throw new Error("Undefined ViewType:" + this.options.type)
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(viewType);

    let viewContainerRef = this.mmrRoot.viewContainerRef;
    viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(componentFactory);
      // (<MMRViewComponent>componentRef.instance).setOptions(this.options === null ? {} : this.options);
      if (this.options) {
        for (var p in this.options) {
          this.componentRef.instance[p] = this.options[p];
        }
      }

  }

}
