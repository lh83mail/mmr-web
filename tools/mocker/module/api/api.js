var express = require('express');
var router = express.Router();

// /api/v1/views/${viewId}/config

router.get('/views/:viewId/config', (req, res) => {
    let viewId = req.param('viewId');
  
    res.send({
        id: viewId,
        description: "this is description",

        data: {
            "name": "李四",
            "age": 32,
            "valid": true
        },

        views: [
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
            },
            {
                id: 'card2',
                title: '${name}',
                subTitle:'${name} 的个人数据',
                type:'card'
            }            
        ]
    })    
})
module.exports = router