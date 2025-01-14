import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import path from 'path';

import { server_Config } from './services/server_config.js';
import { ConnectDb } from './services/db.config.js';
import userRouter from './routers/userRoute.js';
import ProductRouter from './routers/productsRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Frontend during development
  "http://localhost:5174",

];

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow preflight and other methods
    credentials: true, // Allow cookies
  })
);

// Explicitly handle preflight requests
app.options("*", cors());

// Routes
app.use('/user', userRouter);
app.use('/product', ProductRouter);


// Start server and connect database
// server_Config();
ConnectDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
