import {
  AfterContentInit,
  AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, EventEmitter, Input,
  NgZone,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MMRDirective} from "./mmr.directive";
import {MMRComponetRegisty, MMRViewComponent} from "./mmr.service";
import {MmrDataStoreService} from "./services/interfaces";

@Component({
  selector: 'mmr-view',
  template: `<ng-template mmr-root></ng-template>`
})
export class MMRComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() options;
  @Output() afterViewInit  = new EventEmitter<any>();

  @ViewChild(MMRDirective) mmrRoot: MMRDirective;

  constructor(
    private _ngZone: NgZone,
    private _hostDomElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mmrComponetRegisty: MMRComponetRegisty,
    private dataStoreService: MmrDataStoreService,
    private _appRef: ApplicationRef,
  ) {}

  componentRef;
  ngOnInit() {
    this.loadComponent();
  }


  ngAfterViewInit(): void {

    console.log("ngAfterViewInit>>>>>", this.options)
    this.afterViewInit.emit(this)


  }

  ngAfterContentInit(): void {

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
    if (this.options) {
      for (var p in this.options) {
        this.componentRef.instance[p] = this.options[p];
      }
    }

   this._hostDomElement.nativeElement.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
  }

}
