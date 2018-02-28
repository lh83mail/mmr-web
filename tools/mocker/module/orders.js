var express = require('express');
var router = express.Router();


const orders = []


/**
 * 新表单
 */
function createNewOrder() {
  return {
    name:"New Order"
  }
}

/**
 * 创建单据主体
 */
router.get('/purchase_order', (req, res) => {
  const id = req.param('id')
  if (id == null || id == '') {
    res.send(createNewOrder())
  }
  else {
    res.send(orders.find(o => o.id == id))
  }
})

router.get('/purchase_order_items', (req, res) => {
  const id = req.param('id')
  if (id == null || id == '') {
    res.send(createNewOrder())
  }
  else {
    res.send(orders.find(o => o.id == id))
  }
})


/**
 * 创建单据明细
 */
router.get('/datastore/purchase_order_items',(req, res) => {

})



module.exports = router