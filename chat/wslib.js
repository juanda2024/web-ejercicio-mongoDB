const WebSocket = require("ws");
var express = require('express');
var router = express.Router();
const Mensaje = require("./models/mensajes");

const clients = [];
const messages = [];

const wsConnection = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        clients.push(ws);
        mixMessages();
        sendMessages();

        ws.on("message", (message) => {
            messages.push(message);
            sendMessages();
        });
    });

    const sendMessages = () => {
        /* GET mensajes */
        clients.forEach((client) => client.send(JSON.stringify(messages)));
    };

    const mixMessages = () => {
        Mensaje.findAll().then((result) => {
            if (result != null || result[0] != null) {
                for (i in result) {
                    if (messages.find(element => element == result[i]["dataValues"]["message"]) == null) {
                        messages.push(result[i]["dataValues"]["message"]);
                    }
                }
            }
        });
    }
};

exports.wsConnection = wsConnection;