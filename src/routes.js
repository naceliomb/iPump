require("dotenv").config();
const express = require("express");
const Cliente = require("./models/cliente");
const { clientValidation } = require("./middleware/validators");
const { generateUniqueId } = require("./middleware/helpers");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello ");
});

router.post("/createUser", (req, res) => {
    const data = req.body;
    const valid = clientValidation(data);
    if (!valid.status) return res.status(500).send({ message: "Dados inválidos!" });

    const cliente = { ...valid.data, id: generateUniqueId() };
    Cliente.create(cliente)
        .then((clienteCriado) => {
            return res.status(201).send(clienteCriado);
        })
        .catch((erro) => {
            console.error("Erro ao criar cliente:", erro);
            return res.status(500).send({ message: "Erro ao criar cliente!" });
        });
});

router.put("/updateUser/:id", (req, res) => {
    const data = req.body;
    const valid = clientValidation(data);
    if (!valid.status) return res.status(500).send({ message: "Dados inválidos!" });

    const id = req.params.id;
    if (Object.keys(valid.data).length === 0)
        return res.status(500).send({ message: "Sem dados para serem atualizados" });

    Cliente.update(valid.data, { where: { id } })
        .then((clienteAtualizado) => {
            if (clienteAtualizado[0] === 0) return res.status(404).send({ message: "Cliente não encontrado!" });
            return res.status(200).send({ message: "Cliente atualizado com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao atualizar cliente:", erro);
            return res.status(500).send({ message: "Erro ao atualizar cliente!" });
        });
});

router.get("/listUsers", (req, res) => {
    const length = parseInt(req.query.length) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * length;
    Cliente.findAndCountAll({ limit: length, offset }).then((clientes) => {
        return res.status(200).send(clientes);
    });
});

router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then((cliente) => {
            if (!cliente) return res.status(404).send({ message: "Cliente não encontrado!" });
            return res.status(200).send(cliente);
        })
        .catch((erro) => {
            console.error("Erro ao buscar cliente:", erro);
            return res.status(500).send({ message: "Erro ao buscar cliente!" });
        });
});

router.get("/user/searchName/:name", (req, res) => {
    const name = req.params.name;

    if (!name) {
        return res.status(400).send({ message: "Nome não informado!" });
    }

    Cliente.findAll({ where: { name: name } })
        .then((clientes) => {
            if (clientes.length === 0) {
                return res.status(404).send({ message: "Nenhum cliente encontrado com esse nome!" });
            }

            return res.status(200).send({"length": clientes.length, "result":clientes});
        })
        .catch((erro) => {
            console.error("Erro ao buscar clientes pelo nome:", erro);
            return res.status(500).send({ message: "Erro ao buscar clientes pelo nome!" });
        });
});

module.exports = router;
