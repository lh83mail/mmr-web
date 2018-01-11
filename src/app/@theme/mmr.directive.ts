import {Directive, ElementRef, EmbeddedViewRef, ViewContainerRef, Input, Output, ComponentFactoryResolver, TemplateRef, EventEmitter, Injector, ComponentRef, ReflectiveInjector, Optional} from "@angular/core";
import { Direct } from "protractor/built/driverProviders";
import { MMRComponetRegisty } from "app/@theme/mmr.service";
import { MmrDataStoreService } from "app/@theme/services/interfaces";
import { createInjector } from "@angular/core/src/view/refs";
import { Provider } from "@angular/core/src/di/provider";
import { MmrComponentRef } from "app/services/right.service";

@Directive({
  selector: '[mmr-root]',
})
export class MMRDirective {
  constructor(
    public viewContainerRef: ViewContainerRef) { }
}

class Square {
  name = 'square';
}

@Directive({
  selector: '[mmrLoadView]'
})
export class MMRLoadViewDirective {

  componentRef;
  __options;
  mmrComponentRef: MmrComponentRef;

  @Output() theEvent = new EventEmitter<any>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private mmrComponetRegisty: MMRComponetRegisty,
    private dataStoreService: MmrDataStoreService,
    private _hostDomElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Optional() private parentMmrComponetRef: MmrComponentRef,
    private __defaultInjector: Injector
  ) {
  }

  @Input() set options(arg: any) {
    this.__options = arg;
    this.loadComponent();

    // if (!condition && !this.hasView) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    //   this.hasView = true;
    // } else if (condition && this.hasView) {
    //   this.viewContainer.clear();
    //   this.hasView = false;
    // }
  }

  

  loadComponent() {
    const viewType = this.mmrComponetRegisty.getComponetType(this.__options.type);
    if (viewType == null) {
      throw new Error('Undefined ViewType:' + this.__options.type);
    }

    this.mmrComponentRef = new MmrComponentRef(this.parentMmrComponetRef);

    
    const injector = ReflectiveInjector.resolveAndCreate(<Provider[]>[
      {
        provide: MmrComponentRef,
        useFactory: () => this.mmrComponentRef
      }
    ], this.__defaultInjector);


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(viewType);
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, injector);
    if (this.__options) {
      for (const p in this.__options) {
        this.componentRef.instance[p] = this.__options[p];
      }
    }
    this.mmrComponentRef.componentRef = this.componentRef;
  }
}
