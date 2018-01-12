import {Directive, ElementRef, EmbeddedViewRef, ViewContainerRef, Input, Output, ComponentFactoryResolver, TemplateRef, EventEmitter, Injector, ComponentRef, ReflectiveInjector, Optional} from "@angular/core";
import { Direct } from "protractor/built/driverProviders";
import { MMRComponetRegisty } from "app/@theme/mmr.service";
import { MmrDataStoreService } from "app/@theme/services/interfaces";
import { createInjector } from "@angular/core/src/view/refs";
import { Provider } from "@angular/core/src/di/provider";
import { MmrComponentRef } from "app/services/right.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Directive({
  selector: '[mmr-root]',
})
export class MMRDirective {
  constructor(
    public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[mmrLoadView]'
})
export class MMRLoadViewDirective implements OnDestroy {

  __options;
  mmrComponentRef: MmrComponentRef;

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

    const componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, injector);
    if (this.__options) {
      for (const p in this.__options) {
        componentRef.instance[p] = this.__options[p];
      }
    }

    this.mmrComponentRef.componentRef = componentRef;
  
  }

  ngOnDestroy(): void {
    this.mmrComponentRef.destory();
  }
}
