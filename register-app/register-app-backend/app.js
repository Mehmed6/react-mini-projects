import "dotenv/config"
import express from 'express';
import cors from "cors";
import {createEndpoints, startServer} from "./endpoints.js";
import {connectDB} from "./db/mongo.js";

const app = express();
app.use(express.json());
app.use(
    cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));

await connectDB();
const port = process.env.PORT || 8081;

createEndpoints(app);
startServer(app, port);