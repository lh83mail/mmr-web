import { AfterContentInit, AfterViewInit, Component, NgZone, OnInit, QueryList, ViewChildren, ComponentRef, Injectable } from '@angular/core';
import { DataStoreService } from '../../@theme/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MmrDataStoreService, RootView } from '../../@theme/services/interfaces';
import { MMRLoadViewDirective } from 'app/@theme/mmr.directive';

@Component({
  selector: 'app-home',
  template: '<mmr-view></mmr-view>',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}

