import express from "express";
import path from "path";
import http from "http";

import * as fs from 'fs';

import { Server } from "socket.io";
import { on } from "events";

import WorldGenerator from "../SERVER/WorldGenerator.js";
const worldGenerator = new WorldGenerator();

const port = 3069;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3069", "http://localhost:5173"]
    },
});

app.use(express.static("dist"));

const indexPath = path.join(process.cwd(), "dist", "index.html");

class ServerClass {
    constructor() {

        this.socket = null;

        this.gettingWorld = '';

        this.matchFound = false;

    }
}

export const serverClass = new ServerClass();

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

    socket.on("getWorld", (worldName) => {

        serverClass.matchFound = false;
        serverClass.gettingWorld = worldName;
        console.log('getting world', serverClass.gettingWorld)

        let worlds = fs.readdirSync('../SERVER/worlds');
        console.log(worlds)

        for (let i = 0; i < worlds.length; i++) {
            if (worldName === worlds[i]) {

                console.log('maailm olemas');
                serverClass.matchFound = true;

                let worldData = fs.readFileSync(`../SERVER/worlds/${worldName}`, 'utf-8')
                let worldDataSplit = worldData.split(',');

                // console.log(worldDataSplit)

                worldData = '';

                let world = [];
                let tile = [];

                for (let i = 0; i < worldDataSplit.length; i++) {
                    let count = i + 1;


                    if (count % 2 === 0) {

                        tile.push(parseInt(worldDataSplit[i]))
                        world.push(tile)
                        tile = [];

                    } else {

                        tile.push(parseInt(worldDataSplit[i]))
                    
                    }

                }

                // console.log(world)

                sendWorld(world);

                // console.log('found!', worldDataRejoin)

            }
        }

        if (serverClass.matchFound === false) {

            worldGenerator.generateWorld();

        }
    });
});


function sendWorld(worldData) {
    serverClass.socket.emit("returnWorld", worldData);
}


export function saveWorld(worldData) {

    sendWorld(worldData);

    fs.writeFile(`../SERVER/worlds/${serverClass.gettingWorld}`,
    
    worldData.toString(),
    
    function(err) {

        if(err) {
            return console.log(err);
        }
    }); 

}