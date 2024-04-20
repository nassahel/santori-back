const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('conectado a la base de datos!');
    }
    catch (error) {
        console.log(error)
        throw new Error('Error en la conexion a la base de datos');
    }
}

module.exports = {
    dbConnection
}

