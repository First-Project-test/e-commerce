const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderscontroller')

router.post('/', orderController.createorder)
router.get('/:userId', orderController.getOrders)

module.exports = router