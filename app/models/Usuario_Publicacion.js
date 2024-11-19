const { DataTypes } = require('sequelize');
const sequelize = require('../config/basedatos');

const UsuarioPublicacion = sequelize.define('UsuarioPublicacion', {
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_publicacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: 'publicacion',
            key: 'id_publicacion'
        }
    }
}, {
    tableName: 'usuario_publicacion',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_usuario', 'id_publicacion']
        }
    ]
});

module.exports = UsuarioPublicacion;