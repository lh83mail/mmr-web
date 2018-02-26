import { Component } from '@angular/core';

@Component({
  selector: 'app-mmr',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ok, app works!';

  menus = [
    {text:'首页', link:'/views/table-view'},
    {text:'testx', link:'/views/add-user'},
    {text:'采购单', link:'/views/purchase_orders_form'},
    {text:'设置', link:'/modules'},
    {text:'创建销售单', link:'/forms/mdf/purchase_orders_form'},
    {text:'创建用户', link:'/forms/simple/user-editor'},
    {text:'对象', link:'/objects'},

  ];


}
