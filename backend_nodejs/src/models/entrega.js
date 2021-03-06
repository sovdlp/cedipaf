const mongoose = require('mongoose');
const schema = mongoose.Schema;

var entregaSchema = new schema({
    remision: {
        type: String
    },
    cliente: {
        type: String
    },
    fecha_emision: {
        type: Date
    },
    fecha_entrega: {
        type: Date
    },
    transportador: {
        type: String
    },
    guia_envio: {
        type: String
    },
    estado: {
        type: String
    }
},{
    collection: 'remisiones'
});

module.exports = mongoose.model('Entrega', entregaSchema);
