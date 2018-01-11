import {AfterContentInit, AfterViewInit, Component, NgZone, OnInit, QueryList, ViewChildren, ComponentRef, Injectable} from '@angular/core';

export class MmrComponentRef {
  parentMMrComponentRef: MmrComponentRef;
  componentRef: ComponentRef<any>;
  children: Array<MmrComponentRef> = new Array<MmrComponentRef>();

  constructor(parent?: MmrComponentRef) {
    this.parentMMrComponentRef = parent;
    if (this.parentMMrComponentRef != null) {
      this.parentMMrComponentRef.addChild(this);
    }
  }

  addChild(mmrComponentRef: MmrComponentRef) {
    this.children.push(mmrComponentRef);
  }
}