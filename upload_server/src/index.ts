"use strict"

import cors from "cors";
import express from "express";

import { router } from "./router/route";
import { redisClient } from "./redis";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await redisClient.connect();
        app.listen(PORT, async () => {
            console.log(`Upload Server Listening on port: ${PORT}`);
        });

    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
}
start();

const shutdown = async (signal: string) => {
    console.log(`SHUTTING DOWN GRACEFULLY...(${signal})`);
    redisClient.disconnect();
    process.exit(0);
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));


