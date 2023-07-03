require('dotenv').config({ path: '../.env.test' });

module.exports = {
    // ... outras configurações do Jest

    // Configuração das variáveis de ambiente
    setupFiles: ["../.env.test"],
};
