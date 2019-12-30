// importamos la libreria de mongoose.
const mongoose = require('mongoose');
// definimos el squema que se utilizara en la bd.
const OrderSchema = new mongoose.Schema({
    name: String
});
// exportamos el modelo creado a partir del esquema.
export default mongoose.model('Orders', OrderSchema);