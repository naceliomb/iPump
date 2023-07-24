require("dotenv").config();
const express = require("express");
const Cliente = require("./src/models/cliente");
const clientValidation = require("./src/middleware/validators");
const { generateUniqueId } = require("./src/middleware/helpers");
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
    const cliente = { ...valid.data, id: generateUniqueId() };
    Cliente.create(cliente)
        .then((clienteCriado) => {
            return res.status(201).send(clienteCriado);
        })
        .catch((erro) => {
            console.error("Erro ao criar cliente:", erro);
            return res.status(500).send({ "message:": "Erro ao criar cliente!" });
        });
});

app.put("/updateUser/:id", (req, res) => {
    const data = req.body;
    const valid = clientValidation(data);
    if (!valid.status) return res.status(500).send({ "message:": "Dados inválidos!" });
    const id = req.params.id;
    Cliente.update(valid.data, { where: { id } })
        .then((clienteAtualizado) => {
            if (clienteAtualizado[0] === 0) return res.status(404).send({ "message:": "Cliente não encontrado!" });
            return res.status(200).send({ "message:": "Cliente atualizado com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao atualizar cliente:", erro);
            return res.status(500).send({ "message:": "Erro ao atualizar cliente!" });
        });
});

app.get("/listUsers", (req, res) => {
    const length = parseInt(req.query.length) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * length;
    Cliente.findAndCountAll({ limit: length, offset })
        .then((clientes) => {
            return res.status(200).send(clientes);
        });
});

app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then((cliente) => {
            if (!cliente) return res.status(404).send({ "message:": "Cliente não encontrado!" });
            return res.status(200).send(cliente);
        })
        .catch((erro) => {
            console.error("Erro ao buscar cliente:", erro);
            return res.status(500).send({ "message:": "Erro ao buscar cliente!" });
        });
});

   
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});



module.exports = app;