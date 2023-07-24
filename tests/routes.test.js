const sequelize = require("../db/conn");
const request = require("supertest");
const app = require("../index");

describe("Teste das rotas da aplicação cliente", () => {
    beforeAll(async () => {
        // Conectar ao banco de dados de teste
        await sequelize.authenticate();
        console.log("Conexão estabelecida com sucesso.");
    });

    afterAll(async () => {
        // Fechar a conexão com o banco de dados de teste
        await sequelize.close();
        console.log("Conexão encerrada com sucesso.");
    });

    it("Deve retornar status 201", async () => {
        const response = await request(app).post("/createUser").send({
            name: "Nacelio M Barbosa",
            address: "Rua Exemplo, 134",
        });

        expect(response.status).toBe(201);

        const response2 = await request(app).post("/createUser").send({
            name: "Nacelio M Barbosa",
            address: "Rua Exemplo, 134",
            phone: "88999999999",
        });

        expect(response.status).toBe(201);
    });

    it("Deve retornar status 500", async () => {
        const response = await request(app).post("/createUser").send({
            name: "Nacelio M Barbosa",
            mail: "nacelio@example.com",
            cpf: "12345678900",
            dateBirth: "2000-01-01",
            // address: "Rua Exemplo, 134",
            phone: "88999999999",
            active: true
        });

        expect(response.status).toBe(500);

    });
});
