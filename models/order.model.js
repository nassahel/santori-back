const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    clientId: { type: String, required: true },
    productos: {type: Array},
    total: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
