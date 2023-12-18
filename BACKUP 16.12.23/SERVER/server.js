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
        origin: ["http://localhost:3069"]
    },
});

app.use(express.static("dist"));

const indexPath = path.join(process.cwd(), "dist", "index.html");

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

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("getWorld", () => {

        worldGenerator.generateWorld();

        console.log("Generating world...")

            console.log("World is not ready yet");

            setTimeout(() => {

                console.log("Checking if world is ready...");

                if (worldGenerator.isReady === true) {

                    console.log("World is ready");

                    console.log(worldGenerator.worldData)

                    socket.emit("returnWorld", worldGenerator.worldData);
                }
            }, 500);

        });
    });