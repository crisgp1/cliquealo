const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publicacion = sequelize.define('Publicacion', {
    id_publicacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo_publicacion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
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
        allowNull: false
    }
}, {
    tableName: 'publicacion',
    timestamps: false
});

module.exports = Publicacion;