const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongoBDurl = process.env.MONGODB_URI;


app.use(express.json());



const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const loginRoutes = require('./routes/auth.routes');
app.use('/api/login', loginRoutes);



app.get('/', (req, res) => {
    res.send('Hola mundo!')
});


mongoose.connect(mongoBDurl)
    .then(
        console.log('Conectado a la base de datos! ✅')
    )
    .catch((error) => {
        console.log('Error al conectar a la base de datos', error);

    }),

    app.listen(port, () => {
        console.log(`Servidor escuchando en puerto ${port} ✅`);
    });