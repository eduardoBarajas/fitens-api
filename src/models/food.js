// importamos la libreria de mongoose.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// definimos el squema que se utilizara en la bd.
const FoodSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    nutrients: {kcal: Number, proteinas: Number, calcio: Number, hidratosCarbono: Number,
        fibra: Number, vitaminaA: Number, vitaminaB: Number, vitaminaD: Number, vitaminaE: Number,
        lipidos: Number},
    images: [String],
    available: Boolean
});
// exportamos el modelo creado a partir del esquema.
module.exports = mongoose.model('Foods', FoodSchema);