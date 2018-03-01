
// 新建master表
function newPurchaseOrder(req, res) {
    var order = { "name": "33"}
    res.send(order)
}


var idx = {
    "purchase_orders_form": {
        desc: "master-detail-order",
        commands: {
            "load_purchase_order": newPurchaseOrder,
            // "create_purchase_order": new newPurchaseOrder(),            
            // "save_purchase_order": new newPurchaseOrderItems(),
            // "delete_purchase_order": new newPurchaseOrderItems(),

            // "load_purchase_order_items": new newPurchaseOrderItems(),
            // "load_purchase_order_item": new newPurchaseOrderItems(),
            // "save_purchase_order_item": new newPurchaseOrderItems(),
            // "delete_purchase_order_items": new newPurchaseOrderItems(),            
        }
    }
}


module.exports = function (viewId, command) {
    return (idx[viewId] || {commands:{}}).commands[command] || function(){}
}