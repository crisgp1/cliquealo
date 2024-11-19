const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Usuarios = sequelize.define('Usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    domicilio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    numero_telefonico: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
        beforeValidate: (usuario, options) => {
            // Asegurar que las fechas sean objetos Date válidos
            if (usuario.fecha_nacimiento && !(usuario.fecha_nacimiento instanceof Date)) {
                usuario.fecha_nacimiento = new Date(usuario.fecha_nacimiento);
            }
            if (usuario.fecha_registro && !(usuario.fecha_registro instanceof Date)) {
                usuario.fecha_registro = new Date(usuario.fecha_registro);
            }
        }
    }
});

module.exports = Usuarios;