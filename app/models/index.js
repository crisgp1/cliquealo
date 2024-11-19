const Bancos = require('../models/Bancos');
const Credito = require('../models/Credito');
const DatosVendedor = require('../models/Datos_Vendedor');
const Ofertas = require('../models/Ofertas');
const Publicacion = require('../models/Publicacion');
const UsuarioPublicacion = require('../models/Usuario_Publicacion');
const Usuarios = require('../models/Usuarios');
const Ventas = require('../models/Ventas');

// Asociaciones para DatosVendedor
DatosVendedor.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});

Usuarios.hasOne(DatosVendedor, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});

// Asociaciones para Ventas
Ventas.belongsTo(Publicacion, {
    foreignKey: 'id_publicacion',
    targetKey: 'id_publicacion'
});

Ventas.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});

Ventas.belongsTo(Credito, {
    foreignKey: 'id_credito',
    targetKey: 'id_credito'
});

Publicacion.hasMany(Ventas, {
    foreignKey: 'id_publicacion',
    sourceKey: 'id_publicacion'
});

Usuarios.hasMany(Ventas, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});

Credito.hasMany(Ventas, {
    foreignKey: 'id_credito',
    sourceKey: 'id_credito'
});

// Asociaciones para Credito
Credito.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});

Credito.belongsTo(Bancos, {
    foreignKey: 'id_banco',
    targetKey: 'id_banco'
});

Usuarios.hasMany(Credito, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});

Bancos.hasMany(Credito, {
    foreignKey: 'id_banco',
    sourceKey: 'id_banco'
});

// Asociaciones para Ofertas
Ofertas.belongsTo(Publicacion, {
    foreignKey: 'id_publicacion',
    targetKey: 'id_publicacion'
});

Ofertas.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});

Publicacion.hasMany(Ofertas, {
    foreignKey: 'id_publicacion',
    sourceKey: 'id_publicacion'
});

Usuarios.hasMany(Ofertas, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});

// Asociaciones para UsuarioPublicacion (tabla intermedia)
Usuarios.belongsToMany(Publicacion, {
    through: UsuarioPublicacion,
    foreignKey: 'id_usuario',
    otherKey: 'id_publicacion'
});

Publicacion.belongsToMany(Usuarios, {
    through: UsuarioPublicacion,
    foreignKey: 'id_publicacion',
    otherKey: 'id_usuario'
});

module.exports = {
    Bancos,
    Credito,
    DatosVendedor,
    Ofertas,
    Publicacion,
    UsuarioPublicacion,
    Usuarios,
    Ventas
};

