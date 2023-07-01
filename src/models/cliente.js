class Cliente {
    constructor(id, name, mail, cpf, dateBirth, address, phone, regDate, attDate, acvite) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.cpf = cpf;
        this.dateBirth = dateBirth;
        this.address = address;
        this.phone = phone;
        this.regDate = regDate;
        this.attDate = attDate;
        this.acvite = acvite;
    }
}

module.exports = Cliente;
