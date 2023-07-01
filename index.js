require('dotenv').config()
const express = require("express");
const Cliente = require("./src/models/cliente");
const clientValidation = require("./src/middleware/validators");
const app = express();
const port = process.env.PORT || 3000;
const bd = require("./db/conn");
// Testar a conexão com o banco de dados
bd.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello ");
});
app.post("/createUser", (req, res) => {
    const data = req.body; //pegando dados da requisição
    const valid = clientValidation(data); //validando os dados
    if (!valid) return res.status(500).send({ "message:": "Dados inválidos!" }); //se os dados forem inválidos, retorna uma mensagem de erro
    const cliente = new Cliente(
        data.id,
        data.name,
        data.mail,
        data.cpf,
        data.dateBirth,
        data.address,
        data.phone,
        data.regDate,
        data.attDate,
        data.acvite
    ); //criando um novo cliente

    return res.status(201).send({ "message:": "Cliente criado com sucesso!", cliente }); //se os dados forem válidos, retorna uma mensagem de sucesso
});

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});
