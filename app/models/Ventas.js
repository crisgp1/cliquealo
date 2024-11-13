const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ventas = sequelize.define('Ventas', {
    id_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'publicacion',
            key: 'id_publicacion'
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    monto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo_venta: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_credito: {
        type: DataTypes.INTEGER,
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