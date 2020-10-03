const WebSocket = require("ws");
var express = require('express');
var router = express.Router();
var [getMensajes] = require('./controllers/messages');

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

    async function sendMessages(){
        await mixMessages();
        clients.forEach((client) => client.send(JSON.stringify(messages)));
    };

    async function mixMessages() {
        getMensajes().then((result) => {
            if (result != null || result[0] != null) {
                for (i in result) {
                    if (messages.find(element => element == result[i]["message"]) == null) {
                        messages.push(result[i]["message"]);
                    }
                }
            }
        });
    }
};

exports.wsConnection = wsConnection;