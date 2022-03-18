const {model, Schema} = require('mongoose');

const orderItemSchema = Schema({
    name: {
        type: String,
        minglength: [5, 'Panjang nama makanan minimal 50 karakter'],
        required: [true, 'Nama Makanan harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1']
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);