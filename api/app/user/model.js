const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
let userSchema = Schema({
    full_name : {
        type: String,
        required : [true, 'Nama harus diisi'],
        maxlength : [255, 'Panjang Nama harus antara 3 - 255 karakter'],
        minlength : [3, 'Panjang Nama harus antara 3 - 255 karakter']
    },
    customer_id: {
        type:Number
    },
    email: {
        type:String,
        required:[true, 'Email Harus terisi'],
        maxlength: [255, 'Panjang email maksimal 255 karakter']
    },
    password: {
        type: String,
        required: [true, 'Password Harus di isi'],
        maxlength: [255 , 'Panjang password maksimal 255 karakter']
    },
    role: {
        type:String,
        enum: ['user' ,'admin'],
        default: 'user'
    },
    token: [String],
}, {timestamps:true} );

//validasi email
userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} Harus di isi dengan Email yang Valid`);

//validasi untuk melihat apakah email sudah ter-register atau belum
userSchema.path('email').validate(async function(value){
    try {
        //(1) lakukan pencarian ke collection berdasarkan email
        const count = await this.model('User').count({email: value});
        //(2) kode ini mengindikasikan bahwa jika user ditemukan maka akan mengembalikan 'false'
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);

//validasi untuk membuat password hash
const HASH_ROUND =10;
userSchema.pre('save' , function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});
//plugin untuk membuat id autoincrement "npm i mongoose-sequence"
userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});
module.exports = model('User', userSchema);