const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'cliquealomx:us-central1:cliquealomx', // Reemplaza con el nombre de tu base de datos
  'cliquealo', // Reemplaza con el usuario de tu base de datos
  'root', // Reemplaza con la contraseña de tu base de datos
  {
    host: '35.223.252.43', // Reemplaza con el host de tu base de datos
    dialect: 'mysql',  // Cambia el dialecto si no estás usando MySQL
    logging: false,
  }
  
);
if (sequelize){
    console.log("conexion correcta");
}
else {
console.log("conexion fallida")
}
module.exports = sequelize;
