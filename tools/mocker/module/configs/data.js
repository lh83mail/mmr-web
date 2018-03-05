const TABLE_VIEW = {
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
  
  const ADD_USER_VIEW = {
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
  const MODEL_EDITOR = {
    id: 'model-editor',
    desc: '数据模型定义表单，用来定义对象模型',
    title: '数据模型定义',
  
    runtime: {
      'init': {
        command: 'init-model-editor',
        args: { }
      },
      'close': {
        command: 'close-model-editor',
        args: {}
      },
    },
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
   * 简单表单配置
   */
  const SIMPLE_EDITOR = {
    id: 'user-editor',
    desc: '用于展示简单的单表数据处理',
    title: '用户信息编辑',
  
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
  }
  
  const MASTER_DETAILS_FROM = {
    id: 'purchase_orders_form',
    desc: '主从结构表单模式',
    title: 'xx公司采购单',
  
    children: [
      {
        id: 'card1',
        type: 'card',
        title: '编辑采购单',
        subTitle: '采购单是公司业务常见的一种单据',
  
        children: [
          {
            id: 'steper1',
            type: 'steper',
            children: [
              {
                id: 'step1',
                title: '基本信息',
                type: 'step',
                children: [
                  {
                    id: 'form1',
                    type: 'form',
                    dsName: 'purchase_order',
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
                    ]
                  }, 
                  {
                    id:'btn01',
                    type: 'button',
                    text: '下一步',
                    commands: {
                      'click': {
                        type: 'chain',
                        command: 'chain',
                        args: {
                          'chain': [
                            {
                              type: 'datastore',
                              command: 'commit',
                              args: {
                                store: 'purchase_order'
                              }                            
                            },
                             {
                              type:'view-action',
                              command: 'card1.steper1.nextStep',
                              args: {
                                action: 'card1.steper1.nextStep'
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              },
              {
                id: 'step2',
                title: '详细信息',
                type: 'step',
                children: [
                  {
                    id:'user-grid',
                    type: 'table',
                    dsName: 'purchase_order_items',
                    columns: [
                      {name:"position", filterable: true, quickFilter: true},
                      {name:"name", filterable: true, sortable: true, quickFilter: true},
                      {name:"weight",  text: "体重c", filterable: true },
                      {name:"symbol",  },
                      {name:"symbol_", text: '操作'},
                    ],
                    pageable: {
                      pageSize: 20,
                      pageSizeOptions: [5, 10, 25, 300]
                    }
                  }                
                ],
                commands: {
                  'selected': {
                    type: 'datastore',
                    command: 'filter',
                    args: {
                      store: 'purchase_order_items'
                    }
                  },
                }
              }
            ]
          }
        ]
      }
    ],
  
    dataStores: {
      'purchase_order' : {
        id: 'purchase_order',
        dsType: 0,
        arguments: [
          { name:'id', type: 'page'},
          { name:'eval', type: 'eval', script:`'from_customer'`}
        ],
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
        },     
        associateStores: [
           {
            id: 'purchase_order_items',
            dsType: 1,
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
            },
            arguments: [
              { name:'id', type: 'datastore', from: 'purchase_order', attrName: 'id'}
            ],
            commands: {
              'filter' : {              
                  type: 'remote',
                  command: 'load_purchase_order_items',
                  args: {
                    method: 'POST',
                    params: [
                      { name:'order', type: 'datastore', from: 'purchase_order', attrName: 'id'}
                    ]
                  }
              }
            }
          }        
        ],
        
        commands: {
          'filter' : {              
              type: 'remote',
              command: 'load_purchase_order',
              args: {
                method: 'POST',
                params: [
                  { name:'id', type: 'page'},
                  { name:'eval', type: 'eval', script:`'from_customer'`},
                ]
              }
          }
        }
      },    
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

   module.exports = {
    TABLE_VIEW,
    MASTER_DETAILS_FROM
   }