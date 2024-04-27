const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  active: { type: Boolean, required: true },
  category: { type: String, required: true },
  comentario: { type: String, default: '' },
  detail: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalProducto: { type: Number, required: true },
  _id: { type: String, required: true }
});

const OrderSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  productos: [productSchema], // Utiliza el esquema de producto como tipo de datos
  total: { type: Number, required: true }
});

const Order = mongoose.model('Pedidos', OrderSchema);

module.exports = Order;






// const {Schema, model}= require('mongoose')

// const menuItemSchema = new Schema({
//   id:{
//     type:String,
//     required:[true]
//   },
//   name: {
//     type: 
//     String,required:[true]
//   },
//   quantity: { 
//     type: Number, 
//     required: true 
//   },
//   price: {
//     type: Number,
//     required:[true]
//   },
//   category: {
//     type: String,
//     required:[true]
//   },
//   image: {
//     type: String,
//     required:[true]
//   }
// });

// const OrderSchema = Schema({

//   fecha: { 
//     type: Date, 
//     default: Date.now 
//   },
//   productos: { 
//     type: [],
//     required: true
//   },
//   status: { 
//     type: String, 
//     enum: ['pendiente', 'realizado'], 
//     default: 'pendiente', 
//     required: true 
//   },
//   total: { 
//     type: Number, 
//     required: true 
//   },
// });

// module.exports=model("Pedidos", OrderSchema)