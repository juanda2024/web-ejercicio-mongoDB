
const { MongoUtils, database } = require('../lib/utils/mongo.js');
const COLLECTION_NAME = "mensajes";

async function getMensajes() {
    const mensaje = await MongoUtils.conn();
    const mensajes_obtenidos = await mensaje
        .db(database)
        .collection(COLLECTION_NAME)
        .find({})
        .toArray()
        .finally(() => mensaje.close());
    return mensajes_obtenidos;
}

function insertMensaje(mensaje_nuevo) {
    return MongoUtils.conn().then((mensaje) => {
        return mensaje
            .db(database)
            .collection(COLLECTION_NAME)
            .insertOne(mensaje_nuevo)
            .finally(() => mensaje.close());
    });
}

module.exports = [getProducts, insertProduct];