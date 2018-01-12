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
    {text:'设置', link:'/modules'},
    {text:'枚举维护', link:'/enums-mgr'},
    {text:'用户管理', link:'/users-mgr'},
    {text:'对象', link:'/objects'},
  ];


}
