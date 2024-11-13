const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioPublicacion = sequelize.define('UsuarioPublicacion', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'publicacion',
            key: 'id_publicacion'
        }
    }
}, {
    tableName: 'usuario_publicacion',
    timestamps: false
});

module.exports = UsuarioPublicacion;
