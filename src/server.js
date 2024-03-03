import path from 'node:path';
import { createServer } from 'node:http';
import express from "express";
import { config } from 'dotenv';
import { routes } from "./routes.js";

config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const port = process.env.PORT;
const app = express();
const httpServer = createServer(app);
app.use(express.static(path.join(__dirname, '/../public')));   
app.use(express.json()); 
app.use(routes);


httpServer.listen(port, () => {
    console.log(`🚀 The application is already up to http://localhost:${port}/`)
});

