const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).send({ message: 'Usuario no encontrado' });
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.send({ message: 'Contraseña invalida' })

        const payload = {
            userId: foundUser._id,
            rol: foundUser.rol
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1days' })
        res.send({ token })
    } catch (error) {
        res.status(400).send({ message: 'No se pudo loguear', error })
    }
};


module.exports = { userLogin }