"use strict"

import express from "express";
import cors from "cors";
import "dotenv/config"
import { createClient } from "redis";

import { router } from "./router/route";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);


const PORT = 3000;
const start = async () => {
    try {
        app.listen(PORT, async () => {
            console.log(`Upload Server Listening on port: ${PORT}`);
        });

        // const client = await createClient().on("error", err => console.error("Redis client Error", err)).connect();
    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
}

start();

