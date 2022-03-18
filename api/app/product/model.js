const mongoose = require('mongoose');
const { Schema} = mongoose;

const productSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama makanan minimal 3 karater'],
        required: [true, 'Nama Product harus diisi']
    },
    description : {
        type: String,
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter'],
        required: [true, 'Deskripsi Product harus diisi']
    },
    price : {
        type: Number,
        default: 0,
        required: [true, 'Harga Product harus diisi']
    },


    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'

    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'

    }
}, {timestamps : true})

const Product = mongoose.model('Product' , productSchema);
module.exports = Product;