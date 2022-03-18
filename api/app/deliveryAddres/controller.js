const { subject } = require('@casl/ability');
const { policyFor } = require('../utils');
const DeliveryAddres = require('./model')

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        let address = new DeliveryAddres({...payload, user: user._id});
        await address.save();
        return res.json(address);
    } catch (err) {
        if (err && err.name === 'ValidarionError'){
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
    
    try {
        let{_id, ...payload} = req.body;
        const {id} = req.params.id;
        let address = await DeliveryAddres.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user);
        if(!policy.can('update', subjectAddress)){
            return res.json({
                error:1,
                message: 'Youre not Allowed to modfy this resource'
            })
        }

        address = await DeliveryAddres.findByIdAndUpdate(id, payload, {new: true});
        res.json(address);
        

    } catch (err) {
        if ( err &&  err.message === "ValidationError") {
            return res.json({
                error: 1 ,
                message: err.message,
                fields: err.errors,
    
            });
    
        }
        next(err);
    }
    }

const destroy = async (req, res, next) => {
        try {
            
        let {id} = req.params;
        let address = await DeliveryAddres.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policyFor(req.user);
        if(!policy.can('delete', subjectAddress)){
            return res.json({
                error:1,
                message: 'Youre not Allowed to modfy this resource'
            })
        }
        address = await DeliveryAddres.findByIdAndDelete(id);
        res.json(address);

        } catch (err) {
            if ( err &&  err.message === "ValidationError") {
                return res.json({
                    name: 1 ,
                    message: err.message,
                    fields: err.errors,
        
                });
        
            }
            next(err);
        }
        }


 const index = async (req, res, next) => {
            try {
                let{skip=0, limit=10} = req.query;
                let count = await DeliveryAddres.find({user: req.user._id}).countDocuments();
                let address= 
                await DeliveryAddres
                .find({user: req.user._id})
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .sort('-createdAt')
                return res.json({
                    data: address,
                    count
                });
        
            } catch (err) {
                if ( err &&  err.message === "ValidationError") {
                    return res.json({
                        name: 1 ,
                        message: err.message,
                        fields: err.errors,
            
                    });
            
                }
                next(err);
            }
            }

module.exports ={
    store,
    index,
    update,
    destroy
}