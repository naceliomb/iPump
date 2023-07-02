const clientValidation = (dataBody) => {
    const { id, name, mail, cpf, dateBirth, address, phone, regDate, attDate, acvite } = dataBody;

    // Verificar se todos os campos obrigatórios estão presentes
    if (
        !name ||
        !mail ||
        !cpf ||
        !dateBirth ||
        !address ||
        !phone ||
        acvite === undefined
    ) {
        return false;
    }

    // Outras validações específicas para cada campo
    // ...

    // Retornar true se todos os campos passarem pelas validações
    return true;
};

module.exports = clientValidation;
