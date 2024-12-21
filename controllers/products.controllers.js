const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    const allowedRoles = ['ADMIN', 'SUPERADMIN']
    if (allowedRoles.includes(req.user.rol)) {
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
    } else {
        res.status(401).send('Acceso denegado')
    }

}



const editProduct = async (req, res) => {
    const allowedRoles = ['ADMIN', 'SUPERADMIN']
    if (allowedRoles.includes(req.user.rol)) {
        try {
            const { id } = req.params
            const product = await Product.findById(id);
            if (!product) return res.status(404).send({ message: 'Producto no encontrado' });
            await product.updateOne(req.body);
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send({
                message: 'No se pudo editar el producto',
                error
            })
        }
    } else {
        res.status(403).send('Acceso denegado')
    }
}


const getAllProducts = async (req, res) => {
    const allowedRoles = ['ADMIN', 'SUPERADMIN']
    if (allowedRoles.includes(req.user.rol)) {
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
    const allowedRoles = ['ADMIN', 'SUPERADMIN']
    if (allowedRoles.includes(req.user.rol)) {
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
    } else {
        res.status(401).send('Acceso denegado')
    }

}




module.exports = { createProduct, deleteProduct, getAllProducts, getProductsByCategory, editProduct } 