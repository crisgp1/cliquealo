const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Ofertas = sequelize.define('Ofertas', {
    id_oferta: {
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
    monto_oferta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    fecha_oferta: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'ofertas',
    timestamps: false
});

module.exports = Ofertas;