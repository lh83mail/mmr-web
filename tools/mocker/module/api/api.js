var express = require('express');
var router = express.Router();

// /api/v1/views/${viewId}/config

router.get('/views/:viewId/config', (req, res) => {
    let viewId = req.param('viewId');
  
    res.send({
        id: viewId,
        title: '编辑单一对象',
        description: "this is description",

        data: {
            "name": "李四",
            "age": 32,
            "valid": true
        },

        views: [
            {
                id: 'form',
                title: '${name}',
                subTitle:'${name} 的个人数据',
                type:'form',
                items: [
                    {
                        type: 'input',
                        id: 'name',
                        bindingTo: '${name}',
                        desc:"用户姓名"            
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
module.exports = router