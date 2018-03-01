import { ComponentRef } from '@angular/core';
import { MmrValueAccessable, instanceOfMmrValueAccessable, DataStore } from './mmr-data-store';

export class MmrComponentRef {
  parentMMrComponentRef: MmrComponentRef;
  private _componentRef: ComponentRef<any>;
  children: Array<MmrComponentRef> = new Array<MmrComponentRef>();


  set componentRef(componentRef: ComponentRef<any>) {
    this._componentRef = componentRef;
    componentRef.instance.__mmrComponentRef = this;
  }
  get componentRef(): ComponentRef<any> {
   return this._componentRef
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


  applyValues(ds:DataStore) {
    if (instanceOfMmrValueAccessable(this._componentRef.instance)) { 
      this._componentRef.instance.applyValues(ds);
    }
    this.children.forEach(ref => ref.applyValues(ds))
  }

  readValues(ds:DataStore) {
    if (instanceOfMmrValueAccessable(this._componentRef.instance)) { 
      this._componentRef.instance.updateValues(ds);
    }
    this.children.forEach(ref => ref.readValues(ds))
  }
}