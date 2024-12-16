const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const userSchema = new Schema({
    userImage: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    direction: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['USER', 'ADMIN', 'SUPERADMIN'], default: 'USER' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })


const User = mongoose.model('User', userSchema)
module.exports = User

