const Categories =require('./model');


const store = async (req, res, next) => {
try {
    let payload = req.body;
    let category = new Categories(payload);
    await category.save();
    return res.json(category);

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
        let category = await Categories.findOneAndUpdate(id, payload , {new:true, runValidators:true}) 
        return res.json(category);

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
            let category = await Categories.findOneAndDelete(id);
            return res.json(category);
    
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
                let category = await Categories.find();
                return res.json(category);
        
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