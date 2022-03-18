const {subject} = require('@casl/ability');
const Invoice = require('./model');
const {policyFor} = require('../utils');

const show = async(req,res,next) => {
    
    try {
        

        let policy = policyFor(req.user);
        console.log(policy);
       
        
        
        if(!policy.can('read' , 'Invoice')) {
            return res.json({
                error:1,
                message: 'Anda tidak memiliki akses untuk melihat Invoice ini.'
            });
        }
        
        let {order_id} = req.params;
        let invoices = await Invoice
        .findOne({order: order_id})
        .populate('order')
        .populate('user');
        

        return res.json(invoices);
        
    } catch (err) {
        return res.json({
            error: 1,
            message: 'Error when getting invoice'
        });
       
    }
    
}

module.exports = {
    show
}