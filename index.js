require("dotenv").config();
const express = require("express");
const Cliente = require("./src/models/cliente");
const clientValidation = require("./src/middleware/validators");
const {generateUniqueId} = require("./src/middleware/helpers");
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
    if (!valid.status) return res.status(500).send({ "message:": "Dados inválidos!" }); //se os dados forem inválidos, retorna uma mensagem de erro
    const cliente = { ...valid.data, id: generateUniqueId()}
    console.log(cliente);
    Cliente.create(cliente)
        .then((clienteCriado) => {
            return res.status(201).send(clienteCriado);
        })
        .catch((erro) => {
            console.error("Erro ao criar cliente:", erro);
            return res.status(500).send({ "message:": "Erro ao criar cliente!" });
        });

});

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});
