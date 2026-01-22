import "dotenv/config"

import express from 'express';
import {createEndpoints, startServer} from "./endpoints.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectDB} from "./db/mongo.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    }))

await connectDB();

createEndpoints(app)

const port = process.env.PORT || 8081;
startServer(app, port);