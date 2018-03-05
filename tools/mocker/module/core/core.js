var express = require('express');
var router = express.Router();
var match = require('./commands')
var loadConfig = require('../configs/config').loadConfig
/**
 * 加载视图配置
 */
router.get('/viewconfig/:viewId', (req, res) => {
    let viewId = req.param('viewId');
    let config = loadConfig(viewId)
    if (config != null) {
        res.send(config.cfg)
    }
    else {
        res.send({})
    }    
})

/**
 * 执行远程命令，并返回结果
 */
router.post('/remote/:viewId/:command', (req, res) => {
    let viewId = req.param('viewId');
        command = req.param('command');

        var processor = match(viewId, command)
        processor(req, res);
})


module.exports = router