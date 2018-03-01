
var orderDs = [
    { id: "001", "position": "23", "name": "33", "weight": "44", "symbol": "111", "total":333 }    
]

var orderItemsDs = [
    { id:1, "order": "001", "position": "23", "name": "33", "weight": "44", "symbol": "111" },
    { id:2, "order": "001", "position": "24", "name": "34", "weight": "44", "symbol": "111" },
    { id:3, "order": "001", "position": "25", "name": "35", "weight": "44", "symbol": "111" },
    { id:4, "order": "001", "position": "26", "name": "36", "weight": "44", "symbol": "111" }
]


// 新建master表
function loadPurchaseOrder(req, res) {
    var order = { "name": "new Order"}
    if (req.param('id') != null) {
        order = orderDs.find(d => d.id = req.param('id'))
    }
    res.send(order)
}

// 加载明细
function loadPurchaseOrderItems(req, res) {
    var values = []
    if (req.param('order') != null) {
        values = orderItemsDs.filter(d => d.order == req.param('order'))
    }
    return values
}


var idx = {
    "purchase_orders_form": {
        desc: "master-detail-order",
        commands: {
            "load_purchase_order": loadPurchaseOrder,
            // "create_purchase_order": new newPurchaseOrder(),            
            // "save_purchase_order": new newPurchaseOrderItems(),
            // "delete_purchase_order": new newPurchaseOrderItems(),

            "load_purchase_order_items": loadPurchaseOrderItems,
            // "load_purchase_order_item": new newPurchaseOrderItems(),
            // "save_purchase_order_item": new newPurchaseOrderItems(),
            // "delete_purchase_order_items": new newPurchaseOrderItems(),            
        }
    }
}


module.exports = function (viewId, command) {
    return (idx[viewId] || {commands:{}}).commands[command] || function(){}
}