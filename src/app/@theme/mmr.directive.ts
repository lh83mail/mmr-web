import {Directive, ElementRef, EmbeddedViewRef, ViewContainerRef, Input, Output, ComponentFactoryResolver, TemplateRef, EventEmitter, Injector, ComponentRef, ReflectiveInjector, Optional, ApplicationRef} from '@angular/core';
import { MMRComponetRegisty } from 'app/@theme/mmr.service';
import { MmrDataStoreService, ViewDataManager, ViewComponent, Expression } from 'app/@theme/services';
import { Provider } from '@angular/core/src/di/provider';
import { MmrComponentRef } from './services';
import { OnDestroy, OnChanges, SimpleChanges } from '@angular/core';


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
export class MMRLoadViewDirective implements OnDestroy{

  __options: ViewComponent;
  mmrComponentRef: MmrComponentRef;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private mmrComponetRegisty: MMRComponetRegisty,
    private dataStoreService: MmrDataStoreService,
    private _hostDomElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    //private codegenComponentFactoryResolver: CodegenComponentFactoryResolver,
    @Optional() private parentMmrComponetRef: MmrComponentRef,
    private _appRef: ApplicationRef,
    private __defaultInjector: Injector
  ) {
  }

  @Input() set options(arg: ViewComponent) {
    this.__options = arg;
    this.loadComponent()
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
      componentRef.instance['id'] = this.__options['id'] || ('id_'+Math.random())
      for (const p in this.__options) {
        if (p == 'id') continue;
        componentRef.instance[p] = this.__options[p];        
        this.bindIfExpression(componentRef, p, this.__options[p]);
      }

      if (componentRef.instance['buildExpression']) {
        componentRef.instance['buildExpression'].call(
          componentRef.instance, this.__options
        )
      }

      this.dataStoreService.getDataStoreManager()
      .recordsChanged.subscribe(evt => {
        console.log('record changes from MMRLoadViewDirective')
         if (componentRef.instance['recordChanges']) {
          componentRef.instance['recordChanges'].call(
            componentRef.instance, evt.data
          )
         }
      })
    }
    console.log('directive instance', componentRef.instance)
    this.dataStoreService.updateBindings();
    this.mmrComponentRef.componentRef = componentRef;
  }

  


  /**
   * 绑定具有表达式属性的组件
   * @param componetRef 
   * @param property 
   * @param expression 
   */
  bindIfExpression(componetRef, property, expression) {
    if (expression && /\$\{[^\}]*?\}/.test(expression)) {
        this.dataStoreService.binding(componetRef, property, new Expression(expression))
    }
  }

  ngOnDestroy(): void {
    this.mmrComponentRef.destory();
  }
}
