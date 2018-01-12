import { ComponentRef } from '@angular/core';

export class MmrComponentRef {
  parentMMrComponentRef: MmrComponentRef;
  private _componentRef: ComponentRef<any>;
  children: Array<MmrComponentRef> = new Array<MmrComponentRef>();


  set componentRef(componentRef: ComponentRef<any>) {
    this._componentRef = componentRef;
    componentRef.instance.__mmrComponentRef = this;
  }

  constructor(parent?: MmrComponentRef) {
    this.parentMMrComponentRef = parent;
    if (this.parentMMrComponentRef != null) {
      this.parentMMrComponentRef.addChild(this);
    }
  }

  addChild(mmrComponentRef: MmrComponentRef) {
    this.children.push(mmrComponentRef);
  }

  destory() {
    this._componentRef.instance.__mmrComponentRef = null;
    this._componentRef.destroy();
  }
}