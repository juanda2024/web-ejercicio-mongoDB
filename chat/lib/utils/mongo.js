const uri = "mongodb+srv://admin:OHrvYqzO8qwFcsXb@cluster0.i8eqf.mongodb.net/chat?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

function MongoUtils() {

    const mu = {};

    // Esta función retorna una nueva conexión a MongoDB.
    // Tenga presente que es una promesa que deberá ser resuelta.
    mu.conn = () => {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return client.connect();
    };
    return mu;
}
module.exports = MongoUtils();