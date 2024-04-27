const {Schema, model}= require('mongoose')

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

const OrderSchema = Schema({

  fecha: { 
    type: Date, 
    default: Date.now 
  },
  productos: { 
    type: [],
    required: true
  },
  // status: { 
  //   type: String, 
  //   enum: ['pendiente', 'realizado'], 
  //   default: 'pendiente', 
  //   required: true 
  // },
  total: { 
    type: Number, 
    required: true 
  },
});

module.exports=model("Pedidos", OrderSchema)