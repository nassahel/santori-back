const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category: {type: String, required:true},
    isOffer: { type: Boolean, default: false },
    productImage: { type: String, default: '' },
    offerPrice: { type: Number, default: 0 },
}, { timestamps: true })


const Product = mongoose.model('Product', productSchema)
module.exports = Product

