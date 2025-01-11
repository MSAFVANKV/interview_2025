import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";

import { server_Config } from './services/server_config.js';
import { ConnectDb } from './services/db.config.js';
import path from 'path';



dotenv.config()
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// client side connections
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );



server_Config();
ConnectDb()