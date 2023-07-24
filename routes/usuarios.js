const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
router.post("/api/registro", async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        if(!(first_name && last_name && email && password)) {
            res.status(400).send("Todos los campos son requeridos");
        }
        const oldUser = await User.findOne({email})
            if(oldUser) {
                return res.status(409).send("Actualmente el usuario existe, inicie login en http://localhost:5001/login");
            }
// Encriptando la contraseña del usuario
 const encryptedPassword = await bcrypt.hash(password, 10);
// Password encriptado
 console.log("\nPassword encriptado: " + encryptedPassword);
// Creando el usuario en la bases de datos
 const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(), // Convertimos a minúscula
    password: encryptedPassword,
 });
// Creación del Token
 const token = jwt.sign({
    user_id: user._id,
    email
 },
    process.env.TOKEN_KEY, {
    expiresIn: "30m",
    }
 );
 // Token Generado
 console.log("\nToken Generado: " + token);
 // retornamos el nuevo usuario
    return res.status(201).json(user);
 } catch (err) {
 console.log(err);
 }
});

// lógica del registro Login
router.post("/api/login", async (req, res) => {
    // lógica del inicio de sesión
    try {
       // obteniendo los datos de entrada
    const {
    email,
    password
    } = req.body;
    // Validar los datos de entrada
    if (!(email && password)) {
    res.status(400).send("Todos los datos son requeridos, email y password");
    }
    // Validando la existencia del usuario en la base de datos
    const user = await User.findOne({
    email
    });
    if (user && (await bcrypt.compare(password, user.password))) {
    // Se genera el Token
    const token = jwt.sign({
    user_id: user._id,
    email
    },
    process.env.TOKEN_KEY, {
    expiresIn: "30m",
    }
    );
// Impresión por el terminal del Token generado para el usuario
        console.log("Usuario: " + email + "\nToken: " + token);
// Retornando los datos del usuario
        return res.status(200).json(user);
    }
        return res.status(400).send("Credenciales invalidas");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;