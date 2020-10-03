const mdbconn = require('../lib/utils/mongo.js');
database = "chat";
collection = "mensajes";

function getMensajes() {
    return mdbconn.conn().then((client) => {
        return client.db(database).collection(collection).find({}).toArray();
    });
}

function getMensaje(ts_buscado) {
    return mdbconn.conn().then((client) => {
        return client.db(database).collection(collection).aggregate([{ $match: { ts: ts_buscado } }]).toArray();
    });
}

function insertMensaje(mensaje_nuevo) {
    return mdbconn.conn().then((client) => {
        return client.db(database).collection(collection).insertOne(mensaje_nuevo).finally();
    });
}

function changeMensaje(ts_objetivo, mensaje_modificado) {
    return mdbconn.conn().then((client) => {
        return client.db(database).collection(collection).updateOne(
            { ts: ts_objetivo }, // Filtro al documento que queremos modificar
            { $set: { message: mensaje_modificado.message } } // El cambio que se quiere realizar
        )
    });
}

function deleteMensaje(ts_objetivo) {
    return mdbconn.conn().then((client) => {
        return client.db(database).collection(collection).deleteOne({ ts: ts_objetivo })
    });
}

module.exports = [getMensajes, getMensaje, insertMensaje, changeMensaje, deleteMensaje];