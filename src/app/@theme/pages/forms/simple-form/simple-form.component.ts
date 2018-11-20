import { Component, OnInit, NgZone } from '@angular/core';
import {   MmrConfiguration, RootView } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MmrDataStoreService } from 'app/@theme/services/mmr-data-store.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
  providers: [
    MmrDataStoreService
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
          this.viewConfig = {
            title:'编辑用户信息',
            items: [
              {
                id: 'card1',
                title: '${name}',
                subTitle:'${name} 的个人数据',
                type:'card',
                items: [
                    {
                        type: 'input',
                        id: 'name',
                        bindingTo: '${name}'               
                    }
                ]
              }
            ],
            
            buttongs: ['save','custom'],
            commands: {
                createData: {
                    type: 'remote',
                    command: 'createForm', 
                    args: {
                      method: "GET"
                    }
                },
                saveData: {
                  type: 'remote',
                  command: 'saveFrom', 
                  args: {
                    method: "POST"
                  }
                },
                custom1: {
                  type: 'remote',
                  command: 'save-user-form', 
                  args: {
                    method: "POST"
                  }
                }
            }
          }
        }
      )
  }

  ngOnInit() {

    if (this.isNewForm()) {
      this.dataStoreService.getCommand('createData')
        .execute(d => this.data = d);

      //  this.dataStoreService.execute({
      //   type: 'remote',
      //   command: 'create-user-form', 
      //   args: {
      //     method: "GET"
      //  }})
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
