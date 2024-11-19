const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const DatosVendedor = sequelize.define('DatosVendedor', {
    id_datos_vendedor: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    numero_telefonico: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'datos_vendedor',
    timestamps: false
});

module.exports = DatosVendedor;