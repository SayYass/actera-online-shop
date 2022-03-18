const router = require('express').Router();
const cartControler = require('./controller');
const {police_check} = require('../middlewares');

router.put(
    '/carts',
    police_check('update', 'Cart'),
    cartControler.store
);

router.get(
    '/carts',
    police_check('read', 'Cart'),
    cartControler.index
);

router.put('/cartsdelete',  police_check('update', 'Cart'), cartControler.destroy);
router.put('/carts/:id',  police_check('update', 'Cart'), cartControler.update);

module.exports = router;
