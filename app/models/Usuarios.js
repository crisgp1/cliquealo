const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('Usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numero_telefonico: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuarios;
