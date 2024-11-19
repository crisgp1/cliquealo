const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Credito = sequelize.define('Credito', {
    id_credito: {
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
    estado: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fecha_credito: {
        type: DataTypes.DATE,
        allowNull: true
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    id_banco: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'bancos',
            key: 'id_banco'
        }
    }
}, {
    tableName: 'credito',
    timestamps: false
});

module.exports = Credito;