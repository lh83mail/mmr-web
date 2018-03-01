var express = require('express');
var router = express.Router();
var match = require('./commands')

/**
 * 加载视图配置
 */
router.get('/viewconfig/${viewId}', (req, res) => {
    let viewId = req.param('viewId');
    res.send(cmd.conf)
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