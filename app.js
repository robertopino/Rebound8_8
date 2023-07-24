const cors = require('cors');
const Libro = require('./model/libro');
// Ruta libro
const rutaLibro = require('./routes/libros');
// Ruta usuario
const rutaUsuarios = require('./routes/usuarios');

require("./config/database").connect();
// Requerimiento para cargar las variables de entorno .env
require("dotenv").config();

// Creamos la variable de configuración
const corsOpt = {
    origin: '*', // Se debe reemplazar el * por el dominio de nuestro front
    optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}

// Middleware que valida el Token JWT
const auth = require("./middleware/auth");
// Librerias de encriptacion de jsonwebtoken
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const express = require("express");

const app = express();

app.use(cors(corsOpt));

app.use(express.json());

// El login va acá
// Importando la logica del modelo
const User = require("./model/user");
const libro = require('./model/libro');


app.use("/", rutaUsuarios);

// Acceso a la ruta raíz vacía
app.get("/", auth, (req, res) => {
    res.status(200).send("Bienvenido, se ha validado correctamente esta ruta /inicio con el Token JWT 🙌");
});

app.use("/", auth, rutaLibro);

// hasta aquí llega el Rebound

module.exports = app;