export const TABLE_VIEW = {
  id: 'table-view',
  title: '用户列表',
  children: [
  {
    id:'card1',
    type: 'card',
    title: '所有用户',
    subTitle: '维护系统所有用户信息',
    toolbars: [
      {
        position: 'bottom',
        children: [
          { type: 'button', text: 'LIKE' },
          { type: 'button', text: 'SHARE' },
        ]
      },
      {
        position: 'top',
        children: [
          { id:'table-view-button-query-users', type: 'button', text: '查询数据', command: 'user-grid.load' },
          { id:'table-view-button-add-user', type: 'button', text: '添加用户', command: 'add-user' },
        ]
      }
    ],
    children: [
      {
        id:'user-grid',
        type: 'table',
        columns: [
          {name:"position", text: "序号"},
          {name:"name", text: "姓名"},
          {name:"weight", text: "体重"},
          {name:"symbol", text: "标识"},
        ],

        commands: {
          'load'  : {},
          'sort'  : {},
          'goto'  : {},
          'filter': {}
        }

      }
    ],
    footer: {}
  }
]};

export const USERS_LIST = {
  id: 'users-list',
  title: '用户列表',
  children: [

  ]
}
