import {
  AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, EventEmitter, Input,
  NgZone,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MMRDirective} from "./mmr.directive";
import {MMRComponetRegisty, MMRViewComponent} from "./mmr.service";
import {DataStoreService} from "app/@theme/services/data-store.service";

@Component({
  selector: 'mmr-view',
  template: `<ng-template mmr-root></ng-template>`
})
export class MMRComponent implements OnInit, AfterViewInit {

  @Input() options;
  @Output() afterViewInit  = new EventEmitter<any>();

  @ViewChild(MMRDirective) mmrRoot: MMRDirective;

  constructor(
    private _ngZone: NgZone,
    private _hostDomElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mmrComponetRegisty: MMRComponetRegisty,
    private dataStoreService: DataStoreService,
    private _appRef: ApplicationRef,
  ) {
  }

  componentRef;
  ngOnInit() {
    console.log("ngOnInit>>>>>("+this.componentRef+")", this.options)
    this.dataStoreService.onDataInit.subscribe(data => {
      console.log(">>>>KKK>>>>", data);
    });
    this.loadComponent();
  }


  ngAfterViewInit(): void {
    console.log("ngAfterViewInit>>>>>", this.options)
    this._ngZone.runOutsideAngular(() => this.afterViewInit.emit(this));
  }

  loadComponent() {
    let viewType = this.mmrComponetRegisty.getComponetType(this.options.type);
    if (viewType == null) {
      throw new Error("Undefined ViewType:" + this.options.type)
    }
    console.log('here 1')
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(viewType);
    console.log('here 2')
    let viewContainerRef = this.mmrRoot.viewContainerRef;
    viewContainerRef.clear();
    console.log('here 3')
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    console.log('here 4')
    // (<MMRViewComponent>componentRef.instance).setOptions(this.options === null ? {} : this.options);
      if (this.options) {
        for (var p in this.options) {
          this.componentRef.instance[p] = this.options[p];
        }
      }

   // this._hostDomElement.nativeElement.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);



    console.log('here 5')

    console.log('componenets loaded', this.options)
  }

}
