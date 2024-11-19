const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Ventas = sequelize.define('Ventas', {
    id_venta: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_publicacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'publicacion',
            key: 'id_publicacion'
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    fecha_venta: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    tipo_venta: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    id_credito: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'credito',
            key: 'id_credito'
        }
    }
}, {
    tableName: 'ventas',
    timestamps: false
});

module.exports = Ventas;