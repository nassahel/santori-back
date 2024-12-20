const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send({
            message: 'No se pudo crear el producto',
            error
        })
    }
}


const getAllProducts = async (req, res) => {
    if (req.user.rol === 'ADMIN' || 'SUPERADMIN') {
        try {
            const allProducts = await Product.find();
            res.send(allProducts);
        } catch (error) {
            res.status(400).send({
                message: 'No se pudo enontrar productos',
                error
            })
        }
    } else {
        res.status(401).send('Acceso denegado')
    }

}

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.send(products);
    } catch (error) {
        res.status(400).send({
            message: 'No se pudo enontrar productos',
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productFound = await Product.findByIdAndDelete(req.params.id)
        res.send({
            message: 'Producto borrado con exito',
            productFound
        }
        )
    } catch (error) {
        res.send({ message: 'No se pudo borrar el producto', error })
    }

}




module.exports = { createProduct, deleteProduct, getAllProducts, getProductsByCategory } 