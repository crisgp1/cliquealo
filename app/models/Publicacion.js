const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const Publicacion = sequelize.define('Publicacion', {
    id_publicacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    titulo_publicacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    autor: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    anio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        get() {
            const value = this.getDataValue('anio');
            return value ? new Date(value).getFullYear() : null;
        },
        set(value) {
            if (value) {
                this.setDataValue('anio', new Date(value, 0, 1));
            }
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    kilometraje: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    inv: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    modelo: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'publicacion',
    timestamps: false
});

module.exports = Publicacion;