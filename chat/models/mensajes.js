const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Mensaje extends Model { }

Mensaje.init(
    {
        ts: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Mensaje",
    }
);

Mensaje.sync();
module.exports = Mensaje;