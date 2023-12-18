import express from "express";
import path from "path";
import http from "http";

import { Server } from "socket.io";
import { on } from "events";

import WorldGenerator from "../SERVER/WorldGenerator.js";
const worldGenerator = new WorldGenerator();

const port = 3069;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3069", "https://half-baked-game.web.app"]
    },
});

app.use(express.static("dist"));

const indexPath = path.join(process.cwd(), "dist", "index.html");

class ServerClass {
    constructor() {
        this.socket = null;
    }
}

const serverClass = new ServerClass();

app.get("*", (req, res) => {
    res.sendFile(indexPath);

    req.on("error", (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

io.on("connection", (socket) => {
    console.log("A user connected");

    serverClass.socket = socket;

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("getWorld", () => {

        worldGenerator.generateWorld();

    });
});

export function sendWorld(worldData) {
    serverClass.socket.emit("returnWorld", worldData);
}