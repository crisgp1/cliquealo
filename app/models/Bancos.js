const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Bancos = sequelize.define('Bancos', {
    id_banco: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_banco: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'bancos',
    timestamps: false
});

module.exports = Bancos;