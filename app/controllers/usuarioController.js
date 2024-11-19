const { Op } = require('sequelize');
const { Usuarios } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsuarios = async (req, res) => {
  try {
    const { search } = req.query;
    let usuarios;
    if (search) {
      usuarios = await Usuarios.findAll({
        where: {
          activo: true,
          [Op.or]: [
            { nombre: { [Op.like]: `%${search}%` } },
            { correo_electronico: { [Op.like]: `%${search}%` } }
          ]
        }
      });
    } else {
      usuarios = await Usuarios.findAll({
        where: {
          activo: true
        }
      });
    }
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({
      where: {
        id_usuario: req.params.id,
        activo: true
      }
    });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

exports.createUsuario = async (req, res) => {
    try {
      const { nombre, fecha_nacimiento, domicilio, correo_electronico, numero_telefonico, clave } = req.body;
      if (!nombre || !fecha_nacimiento || !domicilio || !correo_electronico || !numero_telefonico || !clave) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
      // Cifrar la contraseña antes de crear el usuario
      const hashedPassword = await bcrypt.hash(clave, 10);
      const usuario = await Usuarios.create({ ...req.body, clave: hashedPassword });
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  };

exports.updateUsuario = async (req, res) => {
  try {
    const [updated] = await Usuarios.update(req.body, {
      where: { id_usuario: req.params.id, activo: true }
    });
    if (updated) {
      const updatedUsuario = await Usuarios.findByPk(req.params.id);
      res.json(updatedUsuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuarios.update({ activo: false }, {
      where: { id_usuario: id },
      silent: true
    });
    res.status(200).json({ message: 'Usuario desactivado con éxito' });
  } catch (error) {
    console.error('Error al desactivar el usuario:', error);
    res.status(500).json({ error: 'Error al desactivar el usuario' });
  }
};