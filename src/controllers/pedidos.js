const { response, request } = require('express');
const Order = require('../models/pedidos');
const Usuario = require('../models/usuario');
const mongoose = require('mongoose')

const getOrders = async (req = request, res = response) => {
  try {
    const { skip = 0 } = req.query;
    const query = { status: { $in: ['pendiente', 'realizado'] } };
    const orders = await Order.find(query).skip(Number(skip));
    res.json({
      message: 'Pedidos obtenidos',
      orders,
    });
  } catch (error) {
    console.error('Error al obtener los Pedidos', error);
    res.status(500).json({ message: 'Hubo un error al obtener los Pedidos' });
  }
};


const getOrder = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const pedido = await Order.findById(id)
      .populate({
        path: 'order',
        select: 'date status totalCost',
      })
      .populate({
        path: 'user',
        model: Usuario,
        select: 'nombre correo'
      });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json({
      message: 'Pedido obtenido',
      order: pedido,
    });
  } catch (error) {
    console.error('Error al obtener el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al obtener el Pedido' });
  }
};

// const postOrder = async (req, res) => {
//   try {
    

//     const newOrder = req.body;

//     if (!Array.isArray(productos)) {
//       return res.status(400).json({ message: 'La orden debe ser un array de objetos.' });
//     }

//     const newOrder = new Order({
//       order: productos,
//       total: total,
//       fecha: fecha,
//     });

//     await newOrder.save();

//     res.status(201).json({
//       order: newOrder,
//       message: 'Pedido creado',
//     });
//   } catch (error) {
//     console.error('Error al crear el Pedido', error);
//     res.status(500).json({ message: 'Hubo un error al crear el Pedido' });
//   }
// };



const postOrder = async (req, res) => {
  try {
    const orderData = req.body; // Obtener los datos del pedido del cuerpo de la solicitud

    // Crear una nueva instancia del modelo Order utilizando los datos del pedido
    const newOrder = new Order(orderData);

    // Guardar la nueva instancia del pedido en la base de datos
    await newOrder.save();

    // Responder con el pedido creado y un mensaje de éxito
    res.status(201).json({
      order: newOrder,
      message: 'Pedido creado',
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de creación del pedido
    console.error('Error al crear el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al crear el Pedido' });
  }
};




const putOrder = async (req = request, res = response) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de pedido no válido' });
    }

    if (!status) {
      return res.status(400).json({ message: 'El estado de la orden es obligatorio' });
    }

    if (status !== 'realizado' && status !== 'pendiente') {
      return res.status(400).json({ message: 'El estado debe ser "realizado" o "pendiente"' });
    }

    let data = {
      status
    }

    const pedido = await Order.findByIdAndUpdate(id, data, { new: true });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(201).json({
      order: pedido,
      message: 'El pedido se actualizó',
    });
  } catch (error) {
    console.error('Error al modificar el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al modificar el Pedido' });
  }
};

const deleteOrder = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json({
      message: `El pedido ${deletedOrder.order} se inactivó`,
    });
  } catch (error) {
    console.error('Error al inactivar el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al inactivar el Pedido' });
  }
};

module.exports = {
  getOrders,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder,
};
