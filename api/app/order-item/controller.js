const OrderItem = require('./model');


const view = async (req, res, next) => {
    try {
        let {skip=0, limit=10} = req.query;
        let orderItems = await OrderItem.find({order : req.params.order_id})
        .populate('product')
        .skip(parseInt(skip))
        .limit(parseInt(limit))
     
        return res.json(orderItems);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    view
}