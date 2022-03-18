const mongoose = require('mongoose');
const { model,   Schema} = mongoose;

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama kategori minimal 3 karater'],
        maxlength: [20, 'Panjang nama katagori maksimal 20 karakter'],
        required: [true, 'Tag Harus Diisi']
    } })

const Tag= mongoose.model('Tag' , tagSchema);
module.exports = Tag;