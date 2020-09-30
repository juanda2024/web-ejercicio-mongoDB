var express = require('express');
var router = express.Router();
const Mensaje = require("../models/mensajes");
const Joi = require('joi');

const estructura_mensaje = Joi.object({
    ts: Joi.string()
        .required(),

    message: Joi.string()
        .min(5)
        .required(),

    author: Joi.string()
        .required(),
});

/* GET mensajes */
router.get('/', function (req, res, next) {
    Mensaje.findAll().then((result) => {
        if (result == null || result[0] == null) {
            res.status(404).send({ resultado: "No se encontraron mensajes" })
        }
        res.status(200).send(result);
    });
});

/* GET mensaje especificado con un ts */
router.get('/:ts', function (req, res, next) {
    Mensaje.findAll({ where: { ts: req.params.ts } }).then((result) => {
        if (result === null || result[0] == null) {
            return res.status(404).send({ resultado: "El mensaje con el TS dado no se ha encontrado" });
        }
        res.status(200).send(result);
    });
});

/* POST mensaje: con información pasada como JSON */
router.post('/', function (req, res, next) {

    const { error } = estructura_mensaje.validate
        ({
            ts: req.body.ts,
            message: req.body.message,
            author: req.body.author
        });

    if (error) {
        return res.status(400).send({ mensaje: error });
    }

    else {
        Mensaje.create(
            {
                ts: req.body.ts,
                message: req.body.message,
                author: req.body.author
            }
        ).then((result) => {
            res.status(200).send(result);
        });
    }
});

/* PUT mensaje: actualiza el mensaje con la información dada */
router.put('/', function (req, res, next) {
    var bool = true;
    Mensaje.findAll({ where: { ts: req.body.ts } }).then((result) => {
        if (result === null) {
            bool = false;
            return res.status(404).send("El mensaje con ese TS no ha sido encontrado.");

        }
    });
    if (bool == true) {
        const { error } = estructura_mensaje.validate
            ({
                ts: req.body.ts,
                message: req.body.message,
                author: req.body.author
            });

        if (error) {
            return res.status(400).send({ mensaje: error });
        }
        else {
            Mensaje.update(req.body, { where: { ts: req.body.ts } }).then((result) => {
                if (result[0] !== 0) {
                    res.status(200).send({ message: "El mensaje se ha actualizado con exito" });
                }
            });
        }
    }
});

/* DELETE mensaje especificado con un ts */
router.delete('/:ts', function (req, res, next) {
    Mensaje.destroy({ where: { ts: req.params.ts }, }).then((result) => {
        if (result === 1) {
            res.status(200).send({ message: "El mensaje con ese TS se ha eliminado con exito" });
        }
        else {
            res.status(404).send({ message: "No se ha podido elminar el mensaje con el TS indicado" });
        }
    });;
});

module.exports = router;
