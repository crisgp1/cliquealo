const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reserva = require('./Reserva');
const Bancos = require('./Bancos');

const Credito = sequelize.define('Credito', {
  ID_Credito: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_Usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Usuarios,
      key: 'id'
    }
  },
  Estado: {
    type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
  },
  Fecha_Credito: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  id_banco: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Bancos,
      key: 'id'
    }
  },
  
}, {
  tableName: 'Credito',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Credito;