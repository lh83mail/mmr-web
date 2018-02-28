var express = require('express');
var router = express.Router();

class Command {
    process(req, res){}
}

class newPurchaseOrder extends Command {
    process(req, res) {
        return {
            name: "New Order"
        }
    }
}

class newPurchaseOrderItems extends Command {
    process(req, res) {
        return []
    }
}


var commands = {
    "purchase_orders_form": {
        desc: "master-detail-order",

        commands: {
            "load_purchase_order": new newPurchaseOrder(),
            "create_purchase_order": new newPurchaseOrder(),            
            "save_purchase_order": new newPurchaseOrderItems(),
            "delete_purchase_order": new newPurchaseOrderItems(),

            "load_purchase_order_items": new newPurchaseOrderItems(),
            "load_purchase_order_item": new newPurchaseOrderItems(),
            "save_purchase_order_item": new newPurchaseOrderItems(),
            "delete_purchase_order_items": new newPurchaseOrderItems(),            
        }
    }
}



function commandMatcher(viewId, commandId) {
    return new Command()
}

/**
 * 加载视图配置
 */
router.get('/viewconfig', (req, res) => {
    let viewId = req.param.get('viewId');
    var cmd = commands[viewId] || {}  
    res.send(cmd.conf)
})

/**
 * 执行命令
 */
router.post('/command', (req, res) => {
    let viewId = req.param.get('viewId');
        command = req.param.get('commandId');

    var view = commands[viewId] || {}            
})


module.exports = router