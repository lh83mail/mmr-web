import { Component, OnInit, NgZone } from '@angular/core';
import { MmrDataStoreService, DataStoreService, MmrConfiguration, RootView } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class SimpleFormComponent implements OnInit {
  protected  viewId: string
  viewConfig: any;
  
  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: MmrDataStoreService,
    private mmrConfiguration: MmrConfiguration,
  ) {
    this.route.paramMap.subscribe(paramMap => {
      this.viewId = paramMap.get('id')
      this.initView(this.viewId)
    })
  }

  initView(viewId: any): any {
    this.dataStoreService.setupViewId(viewId, new MmrRootView(
      this.dataStoreService, this
    ))

    this.dataStoreService.loadView(this.viewId)
      .toPromise()
      .then(
        cfg => {
          this.viewConfig = cfg
        }
      )
  }

  ngOnInit() {

    if (this.isNewForm()) {
       this.dataStoreService.execute({command: 'create-user-form', args: {
          method: "GET"
       }}, this)
        .subscribe(response => {
            console.log('response', response)
        })
    }
  }

  /**
   * 探测是否为新建表单
   */
  isNewForm(): boolean {
    return true;
  }


  navigateView(viewId: string) {
    const command = ['views'];
    // if (this.route.snapshot.data.next !== '') {
    //   command.push(this.route.snapshot.data.next);
    // }
    command.push(viewId);

    this.router.navigate(command);
  }

}

class MmrRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: SimpleFormComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }
}
