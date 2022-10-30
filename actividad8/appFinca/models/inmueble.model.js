const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inmuebleSchema = new Schema({
    piso: Number,
    letra: String,
    extension: Number,
    num_habitaciones: Number,
    alquilado: Boolean,
    propietario: String,
    mail: String
});

module.exports = mongoose.model('inmueble', inmuebleSchema);