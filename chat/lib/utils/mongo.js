const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/';
const database = "messages";

function MongoUtils() {
    const mu = {};

    mu.conn = () => {
        const mensaje = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        return mensaje.connect();
    };
    return mu;
}

exports.MongoUtils = MongoUtils();
exports.database = database;