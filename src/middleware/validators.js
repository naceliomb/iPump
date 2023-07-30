const moment = require("moment");

const clientValidation = (dataBody) => {
    const { name, mail, cpf, dateBirth, address, phone, active } = dataBody;

    const data = {
        ...(name && { name: cleanName(name) }),
        ...(mail && { mail: cleanEmail(mail) }),
        ...(cpf && { cpf: cleanCPF(cpf) }),
        ...(dateBirth && { dateBirth: cleanDateBirth(dateBirth) }),
        ...(address && { address: cleanAddress(address) }),
        ...(phone && { phone: cleanPhone(phone) }),
        ...(active && { active }),
    };

    // Retornar true se todos os campos passarem pelas validações
    return { status: true, data };
};

const cleanName = (name) => {
    // Remover espaços em branco no início e no final do nome
    name = name.trim();

    // Remover caracteres especiais do nome usando regex
    name = name.replace(/[^\w\s]/gi, "");

    // Converter o nome para minúsculas
    name = name.toLowerCase();

    return name;
};
const cleanEmail = (email) => {
    // Expressão regular para validar e-mails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar se o e-mail corresponde ao formato válido
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        return null; // Retornar null se o e-mail for inválido
    }

    // Remover espaços em branco no início e no final do e-mail
    email = email.trim();

    // Converter o e-mail para minúsculas
    email = email.toLowerCase();

    return email;
};

const cleanCPF = (cpf) => {
    // Remover caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, "");

    // Verificar se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return null; // Retornar null se o CPF for inválido
    }

    return cpf;
};

const cleanDateBirth = (dateBirth) => {
    // Verificar se a data de nascimento é válida
    if (!moment(dateBirth, "YYYY-MM-DD", true).isValid()) {
        return null; // Retornar null se a data de nascimento for inválida
    }

    // Formatar a data de nascimento no formato desejado
    const formattedDateBirth = moment(dateBirth).format("YYYY-MM-DD");

    return formattedDateBirth;
};

const cleanAddress = (address) => {
    // Remover espaços em branco extras no início e no final do endereço
    const cleanedAddress = address.trim();

    return cleanedAddress;
};

const cleanPhone = (phone) => {
    // Remover todos os caracteres que não sejam dígitos
    const cleanedPhone = phone.replace(/\D/g, "");

    // Verificar se o número de telefone tem o tamanho correto
    if (cleanedPhone.length !== 11) {
        return null; // Retornar null se o número de telefone for inválido
    }

    // Formatar o número de telefone no formato desejado
    const formattedPhone = `+${cleanedPhone.substr(0, 2)}(${cleanedPhone.substr(2, 2)})${cleanedPhone.substr(4)}`;

    return formattedPhone;
};

module.exports = { clientValidation, cleanName, cleanEmail, cleanCPF, cleanDateBirth, cleanAddress, cleanPhone};
