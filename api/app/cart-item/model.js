const mongoose = require('mongoose');
const {model, Schema} = require('mongoose');

const cartItemSchema = Schema({
    name: {
        type: String,
        minlength: [5, 'Panjang nama makanan minimal 5 Karakter'],
        required: [true, 'Nama makanan harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Qty harus diisi'],
        min: [1, 'minimal qty adalah 1'],
        default: 1
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = model('CartItem' , cartItemSchema)