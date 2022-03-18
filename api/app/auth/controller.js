const User = require('../user/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const { getToken } = require('../utils');
const register = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        //(1) cek kemungkinan kesalahan terkait validasi model
        if (err && err.name === 'ValidationError') {
            return res.json({
                error : 1,
                message: err.message,
                fields : err.errors
            });
        }
        //(2) error lainya
        next(err)
    }
}

const localStrategy = async (email, password, done) => {
    try {
        let user = await User
        .findOne({email})
        .select('-__v -createdAt -updateAt -cart_items -token');
        if(!user)return done();
        if(bcrypt.compareSync(password, user.password)){
            ({password, ...userWithoutPassword} = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null)
    }
    done();
}

const login = async (req, res, next) => {
    passport.authenticate('local' , async function(err, user){
        if(err) return next(err);
        if(!user) return res.json({ error: 1, message: 'Email or Password incorect' })

        let signed = jwt.sign(user, config.secretkey);
        await User.findByIdAndUpdate(user._id , {$push : {token: signed}});
        res.json({
            message : 'Login Succesfully',
            user,
            token :signed
        })
    })(req, res, next)
}

const logout = async (req, res, next) => {
    let token = getToken(req);
    let user = await User.findOneAndUpdate({token: {$in :[token]}}, {$pull : {token:token}}, {useFindAndModify : false});
    if(!token || !user){
        res.json({
            error: 1,
            message: 'No User Found!!!!'
        })
    }
    return res.json({
        error: 0,
        message: 'Logout Berhasil'
    })
}

const me = (req,res,next) => {
    if(!req.user) {
        return res.json({
            error:1,
            message: `You'are Not Login or Token Expired`
        })
    }
    res.json(req.user);
}
module.exports = {
    register,
    login,
    localStrategy,
    logout,
    me
}