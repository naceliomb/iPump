const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn'); // Importe a instância do Sequelize configurada

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  dateBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'createdAt', // define o nome da coluna como 'createdAt'
  },
  attDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updatedAt', // define o nome da coluna como 'updatedAt'
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'clientes', // nome da tabela no banco de dados
  timestamps: true, // habilita as colunas createdAt e updatedAt
});

module.exports = Cliente;
