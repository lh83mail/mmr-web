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
          { id:'table-view-button-add-user', type: 'button', text: '添加用户', command: {
            command: 'LoadViewExecutor',
            args: {
             viewId: 'add-user'
            }
          } },
        ]
      }
    ],
    children: [
      {
        id:'user-grid',
        type: 'table',
        dsName: 'ds0',
        columns: [
          {name:"position", filterable: true, quickFilter: true},
          {name:"name", filterable: true, sortable: true, quickFilter: true},
          {name:"weight",  text: "体重c", filterable: true },
          {name:"symbol",  },
          {name:"symbol_", text: '操作'},
        ],
        runtime: {
          'init': {
            command: 'list-data',
            args: {
              viewId: 'table-view',
            }
          }
        },
        pageable: {
          pageSize: 20,
          pageSizeOptions: [5, 10, 25, 300]
        }
      }
    ],
    footer: {}
  }
],
dataStores: {
    'ds0' : {
      id: 'ds0',
      dsType: 0,
      model: {
        id: 'model1',
        attributes: {
          position: {
            id: 'position',
            valueType: 0,
            desc: '序号'
          },
          name: {
            id: 'name',
            valueType: 0,
            desc: '姓名'
          },
          weight: {
            id: 'weight',
            valueType: 0,
            desc: '体重'
          },
          symbol: {
            id: 'symbol',
            valueType: 0,
            desc: '代号'
          }
        }
      }
    }
}
};

export const ADD_USER_VIEW = {
  id: 'add-user',
  title: '添加新用户',
  children: [
    {
      id: 'card1',
      type: 'card',
      title: '用户表单',
      subTitle: '用来编辑用户信息的表单',

      toolbars: [
        {
          position: 'bottom',
          children: [
            { type: 'button', text: '提交表单',
              command: {
                command: 'ViewAction',
                args: {
                  action: 'form1.submit'  // /add-user/card1/form1/submit($id)
                }
              }
            },
            { type: 'button', text: '返回' },
          ]
        },
      ],

      children: [
        {
          id: 'form1',
          type: 'form',
          children: [
            {
              id: 'position',
              type: 'input',
              desc: '序号',
              value: 0,
            },
            {
              id: 'name',
              type: 'input',
              desc: '姓名',
            },
            {
              id: 'weight',
              type: 'input',
              desc: '体重',
            },
            {
              id: 'symbol',
              type: 'input',
              desc: '标识',
            }
          ],

          runtime: {
            'submit':{},
            'load': {}
          }
        }

      ]
    }
  ]
};

export const USERS_LIST = {
  id: 'users-list',
  title: '用户列表',
  children: [
    {
      id: 'card1',
      type: 'card',
      title: '所有用户',
      subTitle: '维护系统所有用户信息'
    }
  ]
}

/**
 * 配置:
 *   特性选择,修改
 * 
 * 数据:
 *   定义: 模型 (meta)
 *   类型: 单个对象, 集合
 * 
 * UI:
 *   定义: 模型(meta)
 *   类型: 组合(容器), 单独
 * 
 * 关系: 
 *   数据 <- binding/translate -> UI
 *   
 * 操作:
 *    命令
 * 
 */