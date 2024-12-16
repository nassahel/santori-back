const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.send({ message: 'Usuario no encontrado' });
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.send({ message: 'Contraseña invalida' })

        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.send(
            {
                message: 'Usuario logueado exitosamente!',
                token
            })


    } catch (error) {
        res.send({ message: 'No se pudo loguear', error })
    }
};


module.exports = { userLogin }