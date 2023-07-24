const http = require('http');
const app = require("./app");
const server = http.createServer(app);

const {
    API_PORT
} = process.env;
const port = process.env.PORT || API_PORT;

// Escuchando al servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});