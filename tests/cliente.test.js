const { DataTypes } = require("sequelize");
const Cliente = require("../src/models/cliente");
const sequelize = require("../db/conn");

// Teste para verificar se o modelo do cliente foi definido corretamente
describe("Teste do modelo do cliente", () => {
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

    test("Deve criar uma instância válida do modelo do cliente", () => {
        // Cria uma instância do modelo do cliente
        const cliente = Cliente.build({
            name: "John Doe",
            mail: "john@example.com",
            cpf: "12345678900",
            dateBirth: "1990-01-01",
            address: "123 Main St",
            phone: "1234567890",
        });

        // Verifica se a instância foi criada corretamente
        expect(cliente instanceof Cliente).toBeTruthy();
        expect(cliente.name).toBe("John Doe");
        expect(cliente.mail).toBe("john@example.com");
        expect(cliente.cpf).toBe("12345678900");
        expect(cliente.dateBirth.toISOString().split("T")[0]).toBe("1990-01-01");
        expect(cliente.address).toBe("123 Main St");
        expect(cliente.phone).toBe("1234567890");
    });

    test("Deve criar uma instância válida do modelo do cliente com campos opcionais", () => {
        // Cria uma instância do modelo do cliente
        const cliente = Cliente.build({
            name: "John Doe",
            mail: "john@example.com",
            cpf: "12345678900",
            dateBirth: "1990-01-01",
            address: "123 Main St",
            phone: "1234567890",
            complement: "Apt 1",
            district: "Downtown",
            city: "Anytown",
            state: "NY",
            country: "USA",
        });

        expect(cliente).toBeInstanceOf(Cliente);
    });
    
});
