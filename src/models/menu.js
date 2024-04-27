const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    active: { type: Boolean, required: true },
    category: { type: String, required: [true, 'El estado de oferta es obligatorio'] },
    comentario: { type: String, required: [true, 'El comentario es obligatorio'] },
    detail: { type: String, required: [true, 'El detalle es obligatorio'] },
    image: { type: String, required: [true, 'El precio de oferta es obligatorio'] },
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    price: { type: Number, required: [true, 'El precio es obligatorio'] },
    quantity: { type: Number,  },
})

module.exports = mongoose.model('Menues', productSchema)