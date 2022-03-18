const router = require('express').Router();
const OrderItem = require('./controller');
const {police_check} = require('../middlewares/index');



router.get('/item/:order_id' , police_check('view', 'OrderItem'), OrderItem.view);


module.exports = router;