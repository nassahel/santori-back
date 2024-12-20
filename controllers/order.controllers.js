const mongoose = require('mongoose');
const Order = require('../models/order.model');

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        console.log('Orden recibida:', orderData); // Añade un log para ver los datos recibidos
        const newOrder = new Order(orderData);

        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        console.error('Error al crear la orden:', error); // Log de errores
        res.status(400).send(error);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.send(allOrders);
    } catch (error) {
        res.send({ message: 'No se pudo obtener las ordenes', error });
    }
};


const activeInactiveOrder = async (req, res) => {

    const allowedRoles = ['ADMIN', 'SUPERADMIN']
    if(allowedRoles.includes(req.user.rol)) {
         try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return res.status(404).send('Orden no encontrada');

        order.isActive = !order.isActive
        await order.save()
        return res.status(200).send('Orden actualizada')
    } catch (error) {
        console.error('Error actualizando el estado de la orden:', error);
        return res.status(500).json({ message: 'Error actualizando el estado de la orden' });
    }
    }else {
        return res.status(500).json({ message: 'Acceso denegado' });
    }
   

}





const getOrderById = async (req, res) => {
    try {
        const orderFound = await Order.findById(req.params.id);
        res.send(orderFound);
    } catch (error) {
        res.send(error);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderFound = await Order.findByIdAndDelete(req.params.id);
        res.send({
            message: 'Orden borrada con éxito',
            orderFound
        });
    } catch (error) {
        res.send({ message: 'No se pudo borrar la orden', error });
    }
};

module.exports = { createOrder, getAllOrders, deleteOrder, getOrderById, activeInactiveOrder };
