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
            { type: 'button', text: '返回' , command: {
              command: 'LoadViewExecutor',
              args: {
               viewId: 'table-view'
              }
            }},
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

/**
 * 模型定义页面
 */
export const MODEL_EDITOR = {
  id: 'model-editor',
  desc: '数据模型定义表单，用来定义对象模型',
  title: '数据模型定义',

  children: [
    {
      id: 'main-card',
      type: 'card',
      title: '模型信息',

      toolbars: [
        {
          position: 'bottom',
          children: [
            { type: 'button', text: '保存',
              command: {
                command: 'ViewAction',
                args: {
                  action: 'form1.submit' 
                }
              }
            },
            { type: 'button', text: '返回' , command: {
                command: 'LoadViewExecutor',
                args: {
                viewId: 'table-view'
                }
              }
            },
          ]
        },
      ],

      children: [
        {
          id: 'form1',
          type: 'form',
          children: [
            {
              id: 'name',
              type: 'input',
              desc: '模型名称'
            },
            {
              id: 'desc',
              type: 'input',
              desc: '模型简述'
            }
          ]
        },
        {
          id: 'attributes-detail',
          title: '属性列表',
          type: 'table',
          dsName: 'ds1',
          columns: [
            {name:"desc" },
            {name:"type", },
            {name:"owner", },
          ],
          runtime: {
            'init': {
              command: 'xlist-data',
              args: {
                viewId: 'model-editor',
              }
            }
          },
        }
      ],
    }

  ],

  dataStores: {
    'ds0' : {
      id: 'ds0',
      dsType: 0,
      model: {
        id: 'model-basic',
        attributes: {
          id: {
            id: 'id',
            valueType: 0,
            desc: '模型ID'
          },
          name: {
            id: 'name',
            valueType: 0,
            desc: '模型名称'
          },

          desc: {
            id: 'desc',
            valueType: 0,
            desc: '模型简述'
          }
        }
      }
    },

    'ds1': {
      id: 'ds1',
      model: {
        id: 'model-detail',
        attributes: {
          id: {
            id: 'id',
            valueType: 0,
            desc: '属性ID'
          },
          owner: {
            id: 'owner',
            valueType: 0,
            desc: '所有者'
          },
          type: {
            id: 'type',
            valueType: 0,
            desc: '数据类型'
          },
          desc: {
            id: 'desc',
            valueType: 0,
            desc: '属性说明'
          }
        }
      }
    }
  }
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