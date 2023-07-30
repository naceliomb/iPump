// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bd = require("../db/conn");   
// Testar a conexão com o banco de dados
bd.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });



// Iniciar o servidor
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});


module.exports = app;

