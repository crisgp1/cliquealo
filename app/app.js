const express = require('express');
const app = express();
const sequelize = require('./config/basedatos');

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const bancosRoutes = require('./routes/bancosRoutes');
const creditoRoutes = require('./routes/creditoRoutes');
const datosVendedorRoutes = require('./routes/datosVendedorRoutes');
const ofertasRoutes = require('./routes/ofertasRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const cors = require('cors');


// Importar modelos para inicializar relaciones
require('./models/index');

// Habilitar CORS
app.use(cors());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/bancos', bancosRoutes);
app.use('/api/creditos', creditoRoutes);
app.use('/api/datos-vendedor', datosVendedorRoutes);
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/ventas', ventasRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Not found middleware
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
});

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Probar la conexión a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        // Sincronizar modelos con la base de datos
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos.');

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
            console.log(`API disponible en http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();

module.exports = app;