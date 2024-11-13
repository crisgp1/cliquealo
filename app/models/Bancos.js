const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bancos = sequelize.define('Bancos', {
    ID_Banco: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre_Banco: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'Bancos',
    timestamps: false
});

module.exports = Bancos;