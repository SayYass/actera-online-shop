const Product = require('../product/model');
const CartItem = require('../cart-item/model');

const store = async (req, res, next) => {
    
    try {
        const {items} = req.body;
        const productIds = items.map(item => item._id);
        const products = await Product.find({_id: {$in: productIds}});
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item._id);
            return{
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });
        
        
        await CartItem.bulkWrite(cartItems.map(item => {
            return{
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }));
        return res.json(cartItems)
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const update = async (req, res, next) => {
    console.log(req.body.qty);
    console.log(req.params);
    try {
       // update qty from payload by id
         const _id = req.params.id;
         const  qty = req.body.qty;
            const item = await CartItem.findOneAndUpdate({_id: _id}, {qty: qty}, {new: true});
            return res.json(item);


    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
    }

const destroy = async (req, res, next) => {
   
    try {
        const {items} = req.body;
        const productIds = items.map(item => item._id);
        const products = await Product.find({_id: {$in: productIds}});
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item._id);
            return{
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });
                
        await CartItem.bulkWrite(cartItems.map(item => {
            return{
                deleteOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                   
                    
                }
            }
        }));
        console.log(products)
        return res.json('Succesfull Delete')
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        let items= await CartItem
        .find({user: req.user._id})
        .populate('product');

        return res.json(items);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

module.exports = {
    
    index,
    destroy,
    store,
    update
}