import { ViewChildren, Component } from '@angular/core';
import { NgModule } from '@angular/core/src/metadata/ng_module';


export class MMRViewComponents {
  //  @ViewChildren(MMRComponent) __mmcl;
  @ViewChildren("[mmrLoadView]") __mmcl;

    constructor() { }
}
