
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({ message: 'Acceso denegado 1' })

    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Acceso denegado 2' })
    try {
        const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenIsValid;
        next();

    } catch (error) {
        res.status(401).send({
            message: 'Acceso denegado 3',
            error
        })
    }
}


module.exports = authenticate