const express = require("express");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs"); // lectura de rutas
require("dotenv").config(); // anclar variables de entorno

//apps => se app con el framework express
const app = express();

// db
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb"} ));
app.use(cors());