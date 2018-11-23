var express = require('express');
var router = express.Router();

// /api/v1/views/${viewId}/config

router.get('/views/:viewId/config', (req, res) => {
    let viewId = req.param('viewId');
  
    res.send({
        id: viewId,
        title: '编辑单一对象',
        description: "this is description",

        views: [
            {
                id: 'form',
                title: '${name}',
                subTitle:'${name} 的个人数据',
                type:'form',
                items: [
                    {
                        type: 'input',
                        id: 'id',
                        value: '${id}',
                        desc:"ID"            
                    },
                    {
                        type: 'input',
                        id: 'name',
                        value: '${name}',
                        desc:"用户姓名"            
                    },
                    {
                        type: 'input',
                        id: 'age',
                        value: '${age}',
                        desc:"年龄"            
                    }                                        
                ]
            }           
        ],
        models: [
            {
              id: 'primary',
              dsType: 'REMOTE',
              attributes: [
                  {id:"id", valueType: "INT", desc:"ID", primary: true },
                  {id:"name", valueType: "STRING", desc:"姓名" },
                  {id:"age", valueType: "INT", desc:"年龄" },
              ]
            }
        ],   

        
        commands: {
            'createNewData': {

            },
            'saveData': {

            },
            'loadData': {

            }
        }
    })    
})

/**
 * 执行命令
 */
router.get('/views/:viewId/commands/:commandId', (req, res) => {
    res.send({
        "id": req.query['id'],
        "name": "李四",
        "age": 32,
        "valid": true
    })
})

    
module.exports = router