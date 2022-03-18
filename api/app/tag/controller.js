const Tag =require('./model');


const store = async (req, res, next) => {
try {
    let payload = req.body;
    let tag = new Tag(payload);
    await tag.save();
    return res.json(tag);

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

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        const id = req.params.id
        let tag = await Tag.findOneAndUpdate(id, payload , {new:true, runValidators:true}) 
        return res.json(tag);

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

    const destroy = async (req, res, next) => {
        try {
            
            const id = req.params.id
            let tag = await Tag.findOneAndDelete(id);
            return res.json(tag);
    
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
                let payload = req.body;
                const id = req.params.id
                let tag = await Tag.find();
                return res.json(tag);
        
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

module.exports = {
    index,
    store,
    update,
    destroy
}