const { default: mongoose } = require("mongoose");
const User = require("../models/user.model")
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const userData = req.body

        const userExist = await User.findOne({ email: userData.email })
        if (userExist) return res.send('Ya existe un usuario con ese email')

        const newUserData = {
            ...userData,
            password: await bcrypt.hash(userData.password, 10)
        }

        const newUser = new User(newUserData);
        await newUser.save();
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
}


const getAllUsers = async (req, res) => {
    if (req.user.rol === 'ADMIN' || 'SUPERADMIN') {
        try {
            const allUsers = await User.find();
            res.send(allUsers);
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(401).send('Acceso denegado')
    }

}

const getUserById = async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userId);
        res.send({
            name: userFound.name,
            email: userFound.email,
            direction: userFound.direction,
            rol: userFound.rol,
            userImage: userFound.userImage
        });
    } catch (error) {
        res.send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userFound = await User.findByIdAndDelete(req.params.id)
        res.send({
            message: 'Usuario borrado con exito',
            userFound
        }
        )
    } catch (error) {
        res.send({ message: 'No se pudo borrar el usuario', error })
    }

}




module.exports = { createUser, getAllUsers, deleteUser, getUserById } 