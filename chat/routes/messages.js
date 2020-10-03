var express = require('express');
var router = express.Router();
const Joi = require('joi');
var [getMensajes, getMensaje, insertMensaje, changeMensaje, deleteMensaje] = require('../controllers/messages');

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
router.get('/', async function (req, res, next) {
    const mensajes = await getMensajes().then((result) => {
        if (result == null || result[0] == null) {
            res.status(404).send({ resultado: "No se encontraron mensajes" })
        }
        else {
            res.status(200).send(result);
        }
    });
});

/* GET mensaje especificado con un ts */
router.get('/:ts', async function (req, res, next) {
    const mensaje = await getMensaje(req.params.ts).then((result) => {
        if (result === null || result[0] == null) {
            return res.status(404).send({ resultado: "El mensaje con el TS dado no se ha encontrado" });
        }
        res.status(200).send(result);
    });
});

/* POST mensaje: con información pasada como JSON */
router.post('/', async function (req, res, next) {

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
        var mensaje_nuevo =
        {
            ts: req.body.ts,
            message: req.body.message,
            author: req.body.author
        }
        const mensaje = await insertMensaje(mensaje_nuevo);
        res.status(200).send(mensaje);
    }
});

/* PUT mensaje: actualiza el mensaje con la información dada */
router.put('/', async function (req, res, next) {
    var bool = true;
    var verificacion = await getMensaje(req.body.ts).then((result) => {
        if (result === null || result[0] == null) {
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
            var resultado = await changeMensaje(req.body.ts, req.body).then((result) => {
                if (result[0] !== 0) {
                    res.status(200).send({ message: "El mensaje se ha actualizado con exito" });
                }
            });
        }
    }
});

/* DELETE mensaje especificado con un ts */
router.delete('/:ts', async function (req, res, next) {
    var eliminado = await deleteMensaje(req.params.ts).then((result) => {
        console.log(result.deletedCount)
        if (result.deletedCount === 1) {
            res.status(200).send({ message: "El mensaje con ese TS se ha eliminado con exito" });
        }
        else {
            res.status(404).send({ message: "No se ha podido elminar el mensaje con el TS indicado" });
        }
    });;
});

module.exports = router;
