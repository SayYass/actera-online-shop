const mongoose = require('mongoose');
const {  Schema} = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama makanan minimal 3 karater'],
        required: [true, 'Nama Makanan Harus Diisi']
    } })

const Category = mongoose.model('Category' , categorySchema);
module.exports = Category;