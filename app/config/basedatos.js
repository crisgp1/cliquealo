const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize(
    'cliquealo',  // nombre de la base de datos
    'cliquealo',  // usuario
    'root',       // contraseña 
    {
        host: '10.58.240.3',  // IP de Google Cloud SQL
        dialect: 'mysql',
        logging: console.log,   // Activamos logging para debug
        pool: {
            max: 5,             // máximo de conexiones en el pool
            min: 0,             // mínimo de conexiones en el pool
            acquire: 60000,     // tiempo máximo para obtener una conexión (60 seg)
            idle: 10000         // tiempo máximo que una conexión puede estar inactiva
        },
        dialectOptions: {
            connectTimeout: 60000,  // timeout de conexión (60 seg)
            ssl: {
                rejectUnauthorized: false  // Necesario para conexiones SSL
            }
        },
        retry: {
            max: 3  // número máximo de intentos de reconexión
        }
    }
);

// Función para probar la conexión
const testConnection = async () => {
    console.log('Ejecutando prueba de conexión...');
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente a la base de datos.');
        return true;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        return false;
    }
};

// Ejecutar prueba de conexión
testConnection();

module.exports = sequelize;